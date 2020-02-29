---
title: "Downgrading the Linux Kernel to a Previous Version"
date: "2020-02-29T18:34:00.000Z"
description: "I picked up mobile development with Flutter again for a new project but I ran into several issues. It turned out that a possible temporary solution is to downgrade the Linux kernel to a previous version."
---

Issues while installing Flutter
---
I picked up mobile development with Flutter again for a new project but I ran into several issues. It turned out that a possible temporary solution is to downgrade the Linux kernel to a previous version.

From a previous project, I remembered how I enjoyed the better developer experience with Flutter compared to React Native. So chose to use Flutter again but I also had to install it on my current developer machines (I use a Lenovo X230 and a T430s). Flutter comes with a nice analyzing tool to check if the installation went smoothly called `flutter doctor`. Unfortunately, I ran into two major issues:

* Accepting the Android licenses didn't work
* Hot reloading didn't work

I guess it would have been possible to solve the licensing issue via Android Studio; I couldn't accept the missing hot reloading feature though since that is one of the killer features that makes Flutter development so nice.

Almost switched from Arch to Debian or Ubuntu
---
I ran into several walls trying to resolve the issues and at one time just for the sake to get my first steps done again in Flutter, I installed Ubuntu 18.04 LTS on a Lenovo X220 I have lying around. And BAM, both issues were non-existent. That somehow hinted me in the right direction that it was not a problem with Android Studio or the Flutter installation but rather something with bugs related to the Linux kernel. An issue on the Flutter Github repo confirmed that there are [existing problems with Flutter and Linux kernel 5.5](https://github.com/flutter/flutter/issues/49185).

Downgrading the Linux Kernel
---
After running on Arch for 2 years, that was now the first time I ran into a problem that can occur when dealing with a rolling distro. I lost several hours because of this but after figuring out how to (at least temporarily) solve it, I'm happy to stay on Arch. I will list some reasons at the end of this article.

#### Use pacman -U
In the [Archwiki article for pacman](https://wiki.archlinux.org/index.php/Pacman) under "Additional commands" it explains how to install a 'local' package that is not from a remote repository.

I guess that's why it's a good idea to not empty the `/var/cache/pacman/pkg` folder too rigorously because it allows to install a previous package version very quickly. In my case, `sudo pacman -U /var/cache/pacman/pkg/linux-5.4.15.arch1-1-x86_64.pkg.tar.zst` did the job.

This solved immediately my issues with Flutter and Android Studio. So everything's good for the moment and I can move on with the project.

By the way, there's a dedicated [Archwiki article](https://wiki.archlinux.org/index.php/downgrading_packages) for the topic of downgrading a package. Again, Archwiki is awesome.

#### Additional steps
* Staying on Arch means that I want to continue with updating the system on a regular basis, so how to I prevent overriding the kernel downgrade? In the file `/etc/pacman.conf` make sure there's an entry like this: `IgnorePkg = linux`.
* Listening to the notifications of the [Github issue](https://github.com/flutter/flutter/issues/49185) allows me to keep track and try to upgrade again to the latest Linux kernel which I guess I pretty soon. Flutter community rocks!

Happy to be still on Arch!
---
I was really close to give up on Arch but I'm happy that I found an acceptable solution to stay. Although it was nerve-wrecking and I lost a few hours, I also learned some new stuff and in the end, switching to Debian or Ubuntu would cost me several hours in setting up as well. On the other hand, it was the first time I ran into a major issue on Arch in my field of usage and the current fix is completely okay for me. Let's hope issues like this will be as rare as I have experienced so far.
