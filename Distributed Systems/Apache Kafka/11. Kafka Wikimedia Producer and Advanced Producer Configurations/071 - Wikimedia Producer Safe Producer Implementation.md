Okay, so let's have a look

at how we can implement a safe producer in Wikimedia.

And as you know, I've told you,

because we are using a version of Kafka,

so let's go into Kafka Producer Wikimedia, build dot grade.

We are using Kafka 310, which is greater than 300.

That means that our clients are going to be safe by default.

So that means that the producer

is going to have a safe contact by default.

So if we have a look at the log right here,

we see that ACKS equals one, which means all.

We see that the delivery timeout is 120,000 seconds,

which is good.

We see that the max in flight request per second connection

is five, yes.

We see that enable indempotence equals true,

and we see that retries is equals to integer dot max config.

So all the configs that I said from before

are set correctly, and the one we don't see

is the main in-sync replica.

And there is a producer, a broker site config.

So to check the main in-sync replica setting,

you just go to brokers, and then you find your broker.

You click on it.

And in the configuration,

you can look up any configuration you want.

So if I look at the min in-sync replica, we can see

that the value is one, and that's the default config.

And because we only have one broker,

it's not recommended to change it.

You cannot have it higher than one,

otherwise things will break.

So we've seen that, yes indeed, the defaults are set,

but if I were to change my Kafka clients

to use something like 2.8.0.

Let me refresh this right now.

I'm going to re-download everything.

Okay, so this is done,

and then I'm going to just run my producer

and then stop it right away.

So let's run it.

And then stop it.

Here we go.

So we are using, now, X equals one.

So you see now it's not all, it's not minus one, it's one.

So definitely things have changed.

Enable idempotence is false, where it used to be true,

and so on.

So what we can do to fix this is to manually,

properly set a safe producer.

So I will say set safe producer configs,

and this is just for Kafka, less or equal than 2.8,

if you wanted to, okay?

So we can just copy this line of code and do it.

So we have the enable idempotence config

to be equals to true.

We have the ACKS setting to be close to all.

It's also same as setting minus one, okay?

And then the retries, you could set the retries,

so if you wanted to, you could set it

to integer dot max value,

and then to string.

So integer, to string,

and then we provide the integer dot max value.

Okay?

And then we could also set the other values if we wanted to.

But for now, this is good enough.

Max in flight is also going to be good enough.

So you can just have, but I don't wanna specify it,

but max in flight is five, and so on.

So now once we do these things,

if we rerun our producer right here,

and click on stop, as we can see, ACKS equals minus one.

Enable idempotence equals true.

And then we have the correct delivery timeout milliseconds.

We have the correct retries,

and we have the correct everything.

So that means that now our producer is safe.

So if you are using a version of Kafka that is recent,

and now I'm going to put back 310, then you're good to go.

I'm gonna click the little elephant right here

to synchronize.

But if you're using, you know, an older version of Kafka,

and this would be the case for many of your programs,

I would bet, then absolutely do set the configurations

that enabled you to have a safe producer, okay?

So I hope you liked this lecture,

and I will see you in the next lecture.
