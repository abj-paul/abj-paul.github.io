In this article, we explore our intuition of - "Why is not UML the de-facto formal specification language?". We could think of the following reasons behind it.

- UML is not expressive enough. FSP, Alloy, TLA+ are much more expressive.
- We simply can't model some requirements easily using UML.

  If we could find some example requirements that we can express using Formal Specification Languages but can't using UML syntax, then we would be able to prove our hypothesis. Let us now start formally working on it.
  
# Hypothesis 1
Our hypothesis is as follows.
`Explaining some requirements via UML is cumbersome.`
## Therac-25 Interface
We demonstrate using the example of user interface in Therac-25 example. Following is the formal specification of Therac-25 interface.


``` text
const IntNotSet = 0
const IntXray = 1
const IntEBeam = 2
range IntModeState = IntNotSet .. IntEBeam

INTERFACE = INTERFACE[IntNotSet],
INTERFACE[mode:IntModeState] = (x -> CONFIRM[IntXray] | e -> CONFIRM[IntEBeam]),
CONFIRM[mode:IntModeState] = (up -> INTERFACE | enter -> FIRE[mode]),
FIRE[mode:IntModeState] = (
    when (mode == IntXray) b -> fire_xray -> enter -> INTERFACE
    |
    when (mode == IntEBeam) b -> fire_ebeam -> enter -> INTERFACE
    |
    up -> CONFIRM[mode]
).

```
And the UML for Therac-25 interface is below.

[](https://github.com/abj-paul/abj-paul.github.io/blob/main/misc/therac25-interface.png)
So effort seems equal in this case.
## Therac-25 Safety Property
The safety propert specification is very complex to understand at first sight.
``` text
const InPlace = 0
const OutPlace = 1
range SpreaderState = InPlace .. OutPlace

const NotSet = 2
const Xray = 3
const EBeam = 4
const ToXray = 5
const ToEBeam = 6
range BeamState = NotSet .. ToEBeam

P = P[InPlace][NotSet],
P[spreader:SpreaderState][power:BeamState] = (
    when (power == NotSet || power == Xray || power == ToEBeam) x -> P[InPlace][Xray]
    |
    when (power == NotSet || power == EBeam || power == ToXray) e -> P[OutPlace][EBeam]
    |
    when (power == Xray || power == ToEBeam) e -> P[OutPlace][ToEBeam]
    |
    when (power == EBeam || power == ToXray) x -> P[InPlace][ToXray]
    |
    when (power == ToEBeam) setMode -> P[spreader][EBeam]
    |
    when (power == ToXray) setMode -> P[spreader][Xray]
    |
    when (power != NotSet && (spreader != OutPlace || power == EBeam || power == ToXray)) b -> P[spreader][power]
).
```

But its UML, while small, feels impossible to decipher.
[](../../misc/therac25-safety.png)
## Therac-25 Total System
The total system is a parellel composition of individual entities.
``` text
const IntNotSet = 0
const IntXray = 1
const IntEBeam = 2
range IntModeState = IntNotSet .. IntEBeam

INTERFACE = INTERFACE[IntNotSet],
INTERFACE[mode:IntModeState] = (x -> CONFIRM[IntXray] | e -> CONFIRM[IntEBeam]),
CONFIRM[mode:IntModeState] = (up -> INTERFACE | enter -> FIRE[mode]),
FIRE[mode:IntModeState] = (
    when (mode == IntXray) b -> fire_xray -> enter -> INTERFACE
    |
    when (mode == IntEBeam) b -> fire_ebeam -> enter -> INTERFACE
    |
    up -> CONFIRM[mode]
).

BEAM = (x -> XRAY | e -> EBeam),
XRAY = (x -> XRAY | e -> ToEBeam),
ToEBeam = (setMode -> EBeam | x -> XRAY | e -> ToEBeam),
EBeam = (e -> EBeam | x -> ToXray),
ToXray = (setMode -> XRAY | e -> EBeam | x -> ToXray).

SPREADER = (e -> OUTPLACE | x -> SPREADER),
OUTPLACE = (e -> OUTPLACE | x -> SPREADER).

||SYS = (INTERFACE || BEAM || SPREADER).
```
The UML diagram for it is extremely large and very hard to understand.
[](../../misc/therac25-total.png)
## Conclusion
In the above examples, we observed a relatively equal degree of complexity between UML and LTS. Only `Total System` diagram was uncanny and huge since it was parallel composition of three systems. In practice, we would just draw the three systems' UML individually. So we can conclude that UML and LTS based specifications have equal complexity.
# Hypothesis 2
Our hypothesis is:

``` text
  We can't explain some requirements via UML.
```

This also seems unlikely. Because UML diagrams are used to model everything. And LTL specifications also have equivalent UMLs. I just don't know much.


