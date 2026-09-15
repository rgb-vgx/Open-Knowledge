Hi, this Difan from Conduktor

and in this lecture we're going

to install the Kafka binaries on Windows.

But first we need to install WSL2.

So even if you started Conduktor with Docker

and Kafka with Docker,

it's important that you run these steps

to also have the Kafka CLI commands available on Windows.

So first, to install WSL2,

we must have Windows 10 or above and then install WSL2.

So let's go ahead and do this right now.

Okay, so let's go ahead and install WSL on Windows.

So you just Google it and you click on

the first link from Microsoft Learn,

to install WSL on Windows, and it's very simple,

we have to only run one command.

The only prerequisite is to have a Windows 10

version 2004 and higher or Windows 11.

So let's open PowerShell,

right click and run as administrator.

And then you type in wsl --install.

Press enter.

It's going to download the Windows subsystem for Linux.

It's going to install it, enable a lot of features,

and finally install Ubuntu on your system.

So I'm just going to pause the video until this is done

and do not touch any key on your keyboard.

If you think it's stuck, try to press enter once

or twice maximum and see if that helps.

But I'm just going to wait until this is done.

Okay, so Ubuntu is now installed

and is going to be launched.

So you press enter to enter your Unix user account name,

then you enter a password,

you retype it to make sure that you've typed it well

and then you're good to go.

So we have installed Ubuntu

and now as you can see we are running inside

of a Linux terminal.

So now I am directly using WSL2, and this is Linux.

Okay, so now let's close this window

and in search I can type Ubuntu

and this is not the right one, Ubuntu.

And we can just open this.

And now we have a specified terminal

that will connect into Ubuntu and we are in WSL.

So once you have this,

you have completed the installation of WSL2,

and I will see you in the next lecture

to install Kafka.
