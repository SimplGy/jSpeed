This project is designed to give you a gut-check feel for the JS performance of a phone. It is not statistically accurate, valid, or probably even good in any way.

It does, however, meet these requirements:
* Runs in <250ms
* Gives a general sense of the JS performance of the device
* Breaks down Device performance into these categories:
** Core (not yet)
** String Manipulation
** Dom manipulation
** Animation (not yet)

The project was borne out of a need for rapid mobile JS speed checking.

The statistical validity, if there is any, would come from the broad sample set, rather than multiple tests on the same device.

I intentionally/ignorantly/lazily do not handle issues like pauses between tests to allow for garbage collection, pesudo-random run counts, and other fancy pants math things.

I also do a very limited subset of tests, focusing only on what I think is common only on my personal experience.

Despite all this, intial device testing is promising. It actually comes up with fairly reasonable results.