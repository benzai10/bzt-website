---
title: "Kaizen #4: Switched from st Terminal to termite"
date: "2020-10-31T10:57:00.000Z"
description: "Sometimes suckless sucks"
---

Too Much Hassle With st Terminal
---
While I love the suckless.org philosophy and I'm very happy with dwm as my window manager, it's not the same with the st terminal.

I patched my st terminal to enable scrollback (it's more like page up
and down) and keyboard-based
select and copy text from the terminal which worked okayish, but
lately I ran more often into situations where I wanted to select text
from mulitple continuous screens. But as soon I was in select mode, I
was not able to change the pages anymore.

Realizing that I now would need to research and patch my st
installation for such a basic functionality and knowing that this
feature comes out of the box with other terminal emulations, I
reverted back to termite.

Scrollback and selecting/copying text works without any hiccups.
There's one thing though I need to fix (later): Somehow, dwm shows
"broken" as a window title for termite.

## Update: Fix missing window title
The utility `xprop` showed me that the `WM_NAME` is empty when I open
a `termite` window on my computer. `termite --title="termite"` opens
the terminal with the specified title, so I just had to change this in
the `dwm` config file and after compiling `dwm` I now have a proper
window title.

`static const char *termcmd[]  = { "termite", "--title=termite" };
`
