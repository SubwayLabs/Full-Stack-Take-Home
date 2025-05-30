from __future__ import annotations
import typing as t
from datetime import date

from django.db import models

STATUS_CHOICES = [
    ["r", "running"],
    ["s", "stopped"],
]

class Channel(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES)

    @classmethod # this was refactored with help from chatgpt
    def get_report(cls, channels: t.List[int], start: date, end: date, pass_capacity: float = .7):
        """Generate a report of the pass rate for a list of channels

        Args:
            channels (t.List[int]): Channel IDs to get reports for
            start (date): Start Date to get reports for
            end (date): End Date to get reports for
            pass_capacity (float, optional): Capacity to consider as a pass. Defaults to .7.

        """
        batches = (
            Batch.objects
            .filter(channel_id__in=channels, date__range=(start, end))
            .annotate(
                total_batteries=models.Count("battery"),
                passed_batteries=models.Count("battery", filter=models.Q(battery__capacity__gte=pass_capacity))
            )
            .select_related("channel")
        )

        results = [
            {
                "channel": batch.channel,
                "batch": batch,
                "pass_rate": batch.passed_batteries / batch.total_batteries if batch.total_batteries > 0 else 0,
            }
            for batch in batches
        ]    

        return results


class Batch(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    date = models.DateField()

class Battery(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    capacity = models.FloatField()
