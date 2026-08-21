-: Let me try to explain

what is LangChain under six minutes.

LangChain is an open source framework

that simplifies the process

of building LLM-powered applications.

It provides us with a set of tools and abstractions

that make it easier for us

to create complex LLM-powered applications.

And LangChain was massively adopted by the industry,

mostly by developers who want

to build LLM-based applications without really understanding

how machine learning works or how to train models,

but rather to use models as a black box.

And it's currently one of the most popular frameworks,

if not the most popular frameworks

when developing LLM-powered apps like agents

and rag applications, which we're going

to cover in depth in this course.

It's an open source framework,

so the code is available on GitHub

and we can create pull requests

and we can really see what LangChain

is doing for us under the hood.

It has a thriving community of contributors and creators,

building some amazing stuff with LangChain.

All right, so up until now, I have shown you

that LangChain is cool,

that it's widely adopted in the industry

and that it helps us build LLM applications,

but I haven't really showed you how it does it,

and which tools and which abstractions help us

to implement those LLM applications.

So imagine you wanna build an app on top of a powerful,

large language model like Claude Sonnet

or any other LLM you would like,

and that you want to combine it with your own personal data

that the LLM was not trained on, so it's not aware of.

Maybe you want to connect it

to your personal PDF files or maybe to your emails

or your Notion database.

And you also want to construct prompts dynamically

according to some user input.

And of course, you would also want to save the history

of the messages between the user and the AI.

And let's say you want to switch an LLM now

and now you want to use Mistral.

And what if you want to connect the LLM

into a tool like Google Search

or to make an API call according to the user's input.

So this would make your application super powerful

and I can go on and on on more requirements

and more functionality and you can pretty much understand

that building an LLM application

isn't that straightforward if we want to do it ourselves.

It involves with a lot of moving parts

that we need to stitch up together and synchronize.

And luckily for us, LangChain is going to help us do

all of these heavy lifting.

And the craft of building an LLM application

is a whole lot easier when we use LangChain.

It provides a bunch of key different functionalities

divided into modules which help us achieve this.

So let's review some of them.

It abstracts the concept of interacting with the LLM

and through chat models,

we can switch models like we switch our socks.

So we would simply need

to import the correct model we would like to use.

And the beauty of it is that we have the same interface

for all the LLM vendors

and this really gives us freedom as developers

and decouples us from the LLM vendor

and gives us the possibility

to switch between vendors anytime we'd like.

So we won't be vendor-locked to a certain LLM.

Another module of LangChain is prompts, which helps us

with prompt management, optimization,

and prompt serialization.

You can create a template for your prompt

and dynamically inject user input into your template.

making an instance of this prompt template

with your user input.

And that's the final prompt that is going

to be sent to the LLM.

So this helps us a lot with composability

and really gives us a lot of flexibility

of building those kind of LLM applications.

It also have document loaders which help us load

different types of data sources,

for example, our Notion database, some PDF files,

our emails, and thousands of more data sources.

And when we load them, we get a single interface

of a LangChain document, which makes it super easy

to process this data before we streamline it to our LLM.

And another important part of LangChain

is its entire support for the agent ecosystem.

So if you want to build an application which is a gentech,

so to leverage the reasoning capabilities of an LLM

to equip it with tools that it can invoke,

like searching in the internet, querying a database,

or sending an email, basically giving your LLM superpowers,

giving us the ability of implementing some complex logic,

then all of this we can easily integrate

and implement with LangChain

with abstractions of tools, of agent executor,

and LangGraph implementations,

and a lot of cool new concepts

and terminologies that we're all going

to cover elaborately in this course.

Now, don't be afraid of this code snippet.

I promise you, by the end of the first couple of sections,

you'll be competent to create some agentic applications.

So this was just the tip of the iceberg

of what LangChain offers when it comes

for developing an LLM-based application.

It has much more features

and we're going to cover a lot of them in this course,

and we're going to cover them in depth,

including diving into their implementation.

We're going to cover the entire LangChain ecosystem

in stack, and we'll talk about bringing LLM applications

to production, which will involve tracing and monitoring,

which we're going to leverage in this course.

LangSmith, a super convenient tool for debugging

and tracing LLM applications.

So in this course,

we'll be building a real-world AI-based application

that is going to introduce us with all the concepts,

with all the terminology we need to know

when it comes to LangChain.

And at the end, we'll be able

to build ourselves some new applications.