import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType, DjangoConnectionField

from channels.models import Channel, Batch, Battery

class BatteryNode(DjangoObjectType):
    class Meta:
        model = Battery
        fields = ("id", "capacity")
        interfaces = (relay.Node,)
    
class BatchNode(DjangoObjectType):
    class Meta:
        model = Batch
        fields = ("id", "date", "batteries")
        interfaces = (relay.Node,)
    
    batteries = DjangoConnectionField(BatteryNode)

class ChannelNode(DjangoObjectType):
    class Meta:
        model = Channel
        fields = ("id", "name", "status", "batches")
        interfaces = (relay.Node,)
    
    batches = DjangoConnectionField(BatchNode)

class ReportType(ObjectType):
    channel = graphene.Field(ChannelNode)
    batch = graphene.Field(BatchNode)
    pass_rate = graphene.Float()

class Query(graphene.ObjectType):
    battery = relay.Node.Field(BatteryNode)
    batteries = DjangoConnectionField(BatteryNode)

    batch = relay.Node.Field(BatchNode)
    batches = DjangoConnectionField(BatchNode)

    channel = relay.Node.Field(ChannelNode)
    channels = DjangoConnectionField(ChannelNode)

    reports = graphene.List(ReportType, channels=graphene.List(graphene.ID), start=graphene.Date(), end=graphene.Date(), pass_capacity=graphene.Float())

    @staticmethod
    def resolve_reports(root, info, channels, start, end, pass_capacity):
        channel_ids = [relay.Node.resolve_global_id(info, channel)[1] for channel in channels]
        return Channel.get_report(channel_ids, start, end, pass_capacity)

schema = graphene.Schema(query=Query)