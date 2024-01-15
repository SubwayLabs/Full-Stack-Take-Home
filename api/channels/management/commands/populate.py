from datetime import date
from random import random

from django.core.management.base import BaseCommand, CommandError
from dateutil import relativedelta

from channels.models import Channel, Batch, Battery


class Command(BaseCommand):

    def handle(self, *args, **options):
        NUM_CHANNELS = 10
        NUM_BATCHES = 50
        NUM_BATTERIES = 100
        today = date.today()
        for i in range(NUM_CHANNELS):
            channel = Channel.objects.create(name=f"Channel {i}", status="r")
            for j in range(NUM_BATCHES):
                delta = relativedelta.relativedelta(days=j)
                batch = Batch.objects.create(channel=channel, date=today - delta)
                for k in range(NUM_BATTERIES):
                    Battery.objects.create(batch=batch, capacity=random())