Hey, this is from Stephane from Conduktor

and in this lecture we're going to start the Schema Registry

and start using it.

So using the Docker file we had from before,

we can start Kafka and the Schema Registry

and Conduktor configured properly.

So once we'll be using the Conduktor platform,

we'll be able to play with the Schema Registry.

So we will create a schema

and then we'll send data using a producer

into Apache Kafka using that schema,

and we'll consume the data using a consumer as well.

So this is the type of architectural we'll be having

and we'll be using the Avro type of data in our exercise,

and we'll look as well at schema evolution

to see whether or not our producer

or our consumer can send and retrieve data from Kafka.

So just as a reminder,

under Conduktor platform and docker-compose.yml

you have started the services.

If not, click on this button

to make sure the services are running

and you will have Zookeeper, Kafka is here,

and of course, in the button we have the Schema Registry

that we set up as well automatically.

So it's way easier for you to get started.

So then when you're on Conduktor,

you can go on the left on Schema Registry

and this is where we'll be dealing with our schema.

So currently we have zero schemas,

but we'll be adding them very shortly.

So let's first create a topic

and this topic is going to be called demo-schemaregistry.

So we create this topic

and as you can see right here,

there's no schema yet for this topic under the Schema tab.

So let's go in the Schema Registry

and we're going to create schema.

So the type is going to be Avro

and the strategy is going to be Topic Name.

We're going to create a schema for the value of the topic,

so we need to enter a topic name.

It's going to be demo-schemaregistry

and so the computer name is demo-schemaregistry-value.

Here we have to copy the actual schema itself,

so this is called an Avro definition in JSON formats.

And so to enter our own definition,

go into 2-kafka-extended, schema-registry, schema-v1.JSON.

You copy this entire JSON

and this is where we define our record called myrecord.

So if you have a look in here,

the name is myrecord, the type is record,

and we have one field called f1, field one,

and the type is string.

So this is defining how the data

should look like in our Kafka topic.

So let's create this.

So we have created this demo-schemaregistry-value schema

and we have a summary of the schema itself,

and we have the structure in here

saying that there's one field called f1

and the type is string,

as well as the formats being Avro.

So this is enough to get started,

so back into our topic.

I can refresh this page

and as you can see now,

the schema get populated for this topic

and we have the schema we saw from before.

So that means we can start producing data

into our topic using that schema.

So under the Produce tab,

just go and choose for value Avro Schema Registry

and you can be very quick

and do Generate once to generate some fake data,

or you can also go to producer-v1.JSON right here

and copy and paste this value.

So we have F1 of value, value1, which is a strength

and if you try to produce right now, this is working.

The data has been produced and accepted

because the schema of this get converted into Avro

and it was compliant with the schema

we have defined from before.

But watch what happens if I try to send another value

and it contains the field f2

and the value is value one.

So we have changed the field name from f1 to f2.

If I try to produce, I get a server error

and it's saying that it cannot do it

because it should be f1.

And so that means that the data we are trying to send

doesn't respect the schema we've defined for our topic

and so therefore it's going to be refused

and we cannot send the data to Kafka,

so it's a really nice safeguard.

So it protects against field names

but also against data types.

So if I change from value one to 123, for example,

to have an integer

and try to produce again,

we're going to get another error.

It says that the field f1 is expected to be of type string

but we don't have the type string right now.

We have the type integer,

so again, we cannot send data to Kafka

that does not respect the schema for the types as well.

So the only way to do it is to actually send the field f1

with a value that is of type string.

So value two end here, it gets accepted.

So now if you go under the Consume tab,

as you can see, the messages are consumed automatically

and Conduktor is smart enough to know this was Avro format

and to display it as a JSON document.

But as you can see, the value is Avro

and this was possible thanks to this Schema Registry.

So something else we can do

is to go under the Schema Registry

and we can make this Schema evolve.

So we have version one,

but we're going to update it with a different value.

So back in here we have schema-v2

and I'm going to copy and paste this,

but what we're doing here is that we're adding

a second field named f2 of type integer

and the default value is zero.

So we have made our schema evolved

because now we're defining new fields.

So we can check the compatibility

and it says Success: Your schema is compatible

because we're trying to make sure

that any evolution of your Schema

is compatible so that the producers

and the consumers can keep on reading and writing data.

Okay, so let's update it now that the schema is compatible

and now we are on version two.

So back in here, if you look at the structure,

we now have two different fields.

We have f1 of type string and f2 of type int

and on top of it, f2 has a default of zero.

So now if I go back to my topic

and I go and produce,

as you can see, I'm still using the Avro Schema Registry,

but now I can generate my data.

And we have f1, that's a string,

so I'll have it as value one

and f2 is an int, so I'll have it as 123.

Now if we do produce this,

as you can see, this works.

So I can now add a field f2, and that's perfect.

And if I don't have f2 as well, I'll just remove it.

Let's see if that works, that works too

because f2 had a default of zero.

So automatically the zero value will be then added.

So let's get convinced by this.

So if you go under the Consume tab

and have a look at it,

as you can see now the f2 was added, 123,

but then when we did not specify f2.

Then the value zero automatically gets added

because it is a default.

And finally, if I try to enter f2

but to be a string, for example,

I'll just have it as 1234

but in a string with an ABCD or whatever.

And I produce this, I'm gonna get an error

because well, f2 is expected to be an integer.

So we really see the power of the Schema Registry.

There is a whole course around it as well,

but this really is important when you want to have safety

and make sure that your Kafka data follows a specific format

and a specific schema.

So that's it for this lecture.

I hope you liked it

and I will see you in the next lecture.
