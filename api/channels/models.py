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

    @classmethod
    def get_report(cls, channels: t.List[int], start: date, end: date, pass_capacity: float = .7):
        results = []
        channels = cls.objects.filter(id__in=channels)
        for channel in channels:
            batches = Batch.objects.filter(channel=channel, date__gte=start, date__lte=end)
            for batch in batches:
                batteries = Battery.objects.filter(batch=batch)
                count = len(batteries)
                pass_count = 0
                for battery in batteries:
                    if battery.capacity >= pass_capacity:
                        pass_count += 1
                results.append(({
                    "channel": channel,
                    "batch": batch,
                    "pass_rate": pass_count / count,
                }))

        return results


class Batch(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    date = models.DateField()

class Battery(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    capacity = models.FloatField()
