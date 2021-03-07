---
title: "Kaizen #5"
date: "2021-03-07T10:10:00.000Z"
description: "Linux LTS Kernel to the Rescue"
---

Ease of Mind
---

I highly recommend to install not only the latest kernel but also the LTS (long-term support) version, often named something like ```vmlinuz-linux-lts```. I'm using the GRUB bootloader which allows to have a default setting and multiple (as desired) boot options. I had two to three encounters when after updating my packages, Arch wouldn't reboot properly or there were issues in some applications.

### Examples:
- Display was full of artifacts after starting the window manager (dwm)
  - Removed the culprit which was the intel-vulkan driver
- External monitor not working anymore with dwm
  - Currently using the LTS kernel and hoping the problem will be resolved with the next kernel update

It's good to know, that even if something breaks after a package update, there's an immediate easy way to "roll back" to a kernel that at least works properly until the issue with the new kernel is resolved.
