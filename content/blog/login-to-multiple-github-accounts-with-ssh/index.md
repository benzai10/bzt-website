---
title: Login to Multiple Github Accounts with SSH
date: "2020-02-17T18:53:00.000Z"
description: "You only need a few steps to configure your Github configuration in your repositories to use a specific SSH key."
---

SSH Login on Github
---
I find the login with an SSH key the most convenient way and it works well with Magit, an awesome Emacs plugin. By the way, I consider [Magit](https://magit.vc/) as one reason already enough to use Emacs.

Please consult the official [Github documentation](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) to learn how to configure SSH for authentication.

Multiple Github Accounts
---
You cannot use the same SSH key on different Github accounts. I generated a new SSH key with the following command in the `~/.ssh` folder:

	ssh-keygen -t rsa -C "mischa@benzai10.com" -f "id_rsa_benzai10"

Replace the email address and your key identity name accordingly.

Make sure the SSH agent is running with:

	eval "$(ssh-agent -s)"
	
&nbsp;  
Add the key identity to your SSH agent (in my case):

	ssh-add ~/.ssh/id_rsa_benzai10
	
&nbsp;  
Add a file named `config` to the `~/.ssh` folder and put the following text in it:

	#oojooman account
	Host github.com-oojooman
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa

	#benzai10 account
	Host github.com-benzai10
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa_benzai10

The lines beginning with `#` are like comments; use them to describe the account. Add the Github account name with a leading dash (`-`) to the `Host` entry and adjust the correct file names accordingly.

#### Adjust the .git/config Files
You need to adjust the `[remote "origin"]` entries in the `.git/config` files of your local repositories. My example:

	...
	[remote "origin"]
		url = git@github.com-benzai10:benzai10/bzt-website.git
		fetch = +refs/heads/*:refs/remotes/origin/*
	...
	
&nbsp;  
