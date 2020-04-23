---
title: "Grant Permission on Programs installed in the /opt Folder"
date: "2020-03-10T21:26:00.000Z"
description: "I got a permission denied error message while trying to update my Flutter SDK which is installed in the /opt folder of my machine."
---

Some Programs get installed in the /opt Folder
---
I don't know (yet) why some packages installed with `yay` end up being in the `/opt` folder rather than the `/usr/bin` folder. So far, I have `flutter`, `android-studio` and `dropbox` here.

Permission Denied
---
In some situations like trying to update the Flutter SDK with `flutter upgrade`, I got a permission denied error. Usually, I repeat the command with `sudo !!` (the double exclamation mark appends the previous entered command to sudo), but in the case of the Flutter upgrade, it will not allow it or at least advise against it.

Set User Permission Rights to Folders
---
My solution to this issue (maybe there are better solutions) for the moment is setting permission rights for the current user I'm logged in with for these folders:

`sudo chown -R $USER /opt/flutter`
