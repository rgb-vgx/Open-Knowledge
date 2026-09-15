Hi, this is Defend from Conduktor

and so I'm going to show you how we can improve this

to use bulk request.

So as we can see right here, we are doing an index request

for every single message that comes in.

And that is really, really not efficient.

What we would like to do instead is to do a bulk request.

So to do so, right after we receive some records

we're going to create a bulk request.

And I'll name this one bulk request

equals new bulk requests.

Okay. And this one takes no construction.

Next, on the bulk request,

I'm going to add every index request.

So instead of doing this one to insert the index

into open search every time we have one,

we're going to do bulkrequest.add

and then we pass in the index request.

So as we go through our records,

we're going to fill up this bulk request.

And after the four loop is done

after only the four loop is done

then we're going to do bulk request

and then we have to execute it.

Okay. So to execute this bulk request, it's fairly simple.

You need to just do clients.

So open searchclients.bulk, and we pass

in the bulk request with the default request options.

Now, this gives you a bulk response called response.

Okay, I'll call it maybe some bulk response.

And this is fairly handy.

And what I'm gonna do there is only do this bulk request

if my bulk request actually has a number

of actions greater than zero

or else there's no need and you would get an exception.

Okay. So this bulk request now is being done.

And then once we have this,

we can do log the info, inserted,

and then we have bulk requests dot,

bulkresponse maybe, oops,

excuse me, bulkresponse.getitems, then length

and then we can just keep on adding a little bit to the log.

So records, perfect.

Okay. And then we, for example, can add a little bit

of delay to increase our chances of getting a bulk action.

So we can do try thread that sleep

and say, for example, 1000 milliseconds.

And then we're just going to catch that.

Oops, we're just going to catch that exception right here.

So up I will add, catch it here, and we're good to go.

And why is it not happy?

So the catch should be here and it should be happy.

So it's good.

And then the offsets should be committed only if

we are doing actually a bulk request.

Perfect. So we have something pretty good in running

and now we should test it out.

So what I'm going to do is I'm going to click

on this open search demo

and I'm going to reset the offsets to the earliest.

So that's now the new offset is going to be zero.

So let's reset it.

And as you can see, we have some lag appearing on screen.

So we're going to be able to rerun our consumer.

And let's see how fast it goes now to go through

the entire topic for our consumer

because now we're using bulk requests, so let's run it.

And now we're receiving on our records

and inserting 500 records at a time.

So it's quite a very high cadence.

And we're also sleeping one second

in between every single calls.

But as you can see,

we are sending a lot of data very, very fast.

And so if I go in here and refresh this,

the lag is going down pretty fast as well.

And if I were to remove this thread that sleep,

it will go even faster.

So that's it.

We have done a bulk request, so we are more efficient

into the way we go from the Kafka consumer

to elastic search

and this will give us great performance improvements.

I hope you liked this lecture,

and I will see you in the next lecture.
