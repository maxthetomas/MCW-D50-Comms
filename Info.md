# Info

Things I've already discovered.

## Microphone units

There are 2 types of microphones: 
  - Chairman
  - Delegate

Delegate microphones can be configured to be one of the three modes: ``

MCW-D50 uses microphone IDs for communication. The IDs are from serial number of the microphone unit. For example, I have chairman microphone unit `0007-3442`, and controller uses `3442` to communicate with it.

## Communications

The unit uses plain text communication to control 

### Commands

#### `clear`
Stops every delegate microphone.

#### `stop(id)`
Stops a microphone with `id`. Can stop chairman.

#### `off(id)`
Turns off a microphone with `id`.

#### `get_serial(a)`
Gets serial number of `a`. The only found value for `a` is `mo`.

Returns: 
```
serial(a,b,c,d,e,f)
license(con,)
license(cst,)
```

#### `get_fw_ver(a)`
Gets firmware version of `a`. Again, the only found value for `a` is `mo`.

Returns
```
fw_ver(mo,6,1)
```

### Data packets

Packets can contain multiple lines of text. Each line should be treated as its own packet (I think). For example, you can find some connection logs [here](logs/). 

Incoming data packet example:
```
UL 001 xxx xxx 
speakc(3442,8,4)
qm(3442,240,101,S)
```

#### `UL`
Some sort of report of currently in use audio channels. It matches with LEDs on the unit. 

In example `UL 001 xxx xxx` we can see that one of the three channels are used.

> I hope there's a way to configure amount of available channels, but it seems like there are units with maximum of 9 channels and of 3 channels.

#### `speakc(id,b,c)`
Shows that a chairman microphone has started speaking.

Argumentss are:
  - `id` - microphone unit id
  - `b` - unknown, seems to always be 8, may be configurable
  - `c` - unknown, seems to always be 4


#### `speakd(id,b,c)`
Shows that a delegate microphone has started speaking.

Arguments are:
  - `id` - microphone unit id
  - `b` - unknown, seems to always be 8, same as `speakc`
  - `c` - unknown, seems to represent amount of speaking delegate microphones


#### `qm(id,b,c,d)`

Unknown.

Here's some speculation:\
`q` - idk, `m` - mode. 

Arguments: 
  - `id` - microphone unit id
  - `b` - number, unknown
  - `c` - number, unknown
  - `c` - either `S` or `I`, probably `S` for speaking, `I` for idle.


#### `priority_on(N)` and `priority_off(N)`
Indicates status of priority mode.

#### `priority(id,b)`
Indicates if a microphone with `id` has started/stoped priority mode. Argument `b`: `1` means true, `0` means false.

#### `AV` and 9 numbers.
Example: `AV000000000000000050001001001`. The packet is sent when the (dial) is spinned on the unit.

#### `VRdy`
Speculation: Sort of a status report? Voice ready?

#### `err7`
Unknown error.

#### `clear`
Means that clear on the unit or the chairman microphone button has been pressed.