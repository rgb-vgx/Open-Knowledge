Hey, this is Stephane from Conduktor,

and I'm going to summarize now the Kafka Producer defaults

and how to have a safe producer.

So since Kafka 3.0, the producer is safe by default,

and you do not need to do anything.

So, acks equals all minus one,

enable idempotence is equal to true,

but if you're using Kafka 2.8 and lower,

then the producer defaults are going to be acks equals one

and enable idempotence equals false.

No matter what, even 3.0 or 2.8 and lower,

I would definitely recommend using a safe producer

whenever possible,

especially if you don't want to lose any data.

So, the other recommendation I have for you

is to always use upgraded Kafka Clients

to make sure that you can send data into Apache Kafka

with the highest guarantee and the highest safety.

So, since Kafka 3.0 is safe,

you can upgrade your clients

or otherwise you would set manually in your program

acks equals all to ensure data is properly replicated

before an ack is received.

You would set min insync replicas equals two,

which is a broker or topic level setting,

but you need to make sure you have

at least a replication factor of three,

and this will ensure that at least two brokers

that are insync replicas have the data

before you send an ack.

There's also enable idempotence equals true

and this is to make sure that duplicates are not introduced

due to network retries

and you would set retries equals MAX_INT

which is going to guarantee the producer is going to retry

until the delivery timeout millisecond deadline is reached.

And for this, we can keep the value

of two minutes for this delivery, timeout milliseconds.

Finally, for performance reasons,

you can set max in flight request per connection equal five

which is going to ensure maximum performance

while keeping message ordering

because you have also enabled

the enable idempotence equals true.

So, that's it for the summary.

So, to summarize Kafka 3.0, super easy, nothing to do,

but Kafka less than 3.0,

we need to add all these settings.

So, I will see you in the next lecture

just to add them to our producer.
