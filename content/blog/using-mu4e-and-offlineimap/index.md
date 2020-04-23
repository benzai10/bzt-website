---
title: "Kaizen #2: Email in Emacs with mu4e and offlineimap"
date: "2020-04-22T23:26:00.000Z"
description: "After multiple failed attempts to configure using email in Emacs I finally managed to get it work!"
---

mu4e and offlineimap or mbsync? 
---
A few days ago on the subreddit
r/emacs, I read that the new version 1.4 of mu/mu4e has been released.
The release notes contained enough improvements to get me try it once
again.

I skimmed the update manual on the [mu/mu4e
website](https://www.djcbsoftware.nl/code/mu/mu4e/) and I got even
more excited that this time it might work when I saw a dedicated page
for [Gmail
configuration](https://www.djcbsoftware.nl/code/mu/mu4e/Gmail-configuration.html).

This helped me to decide against using mbsync despite having read that
mbsync is much faster than offlineimap.

Only Minor Problems with Standard Gmail
---
The installation via `yay -S mu` and `yay -S offlineimap` went without
any hiccup on my system.

#### Configure offlineimap
One of my upcoming Kaizen tasks is to tidy up my home directory and
organize it according to the [XDG Base Directory
Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html).
That's why it was really nice to read that the latest mu4e version
supports this specification.

After getting an overview of the possible configuration settings in
the file `/usr/share/offlineimap/offlineimap.conf`, I copied the much
smaller `/usr/share/offlineimap/offline.conf.minimal` file to the
newly created `~/.config/offlineimap/` directory and renamed it to
just `config`. 

I followed the Gmail settings instructions from the page mentioned
above and... yeah right, it didnt' work. But I was determined to not
give up too early. Since I tried to set up email on Emacs several
years ago, I've learned a lot about Emacs and I've gained much more
confidence that I would be able to handle the possible obstacles on
the way.

Unless the Gmail account is not setup to allow 'Less secure' apps, the
offlineimap configuration didn't work. Furthermore, I had to add
`sslcacertfile = /etc/ssl/certs/ca-certificates.crt` to the remote
repository section. But with this in place I successfully downloaded
my emails from some standard gmail accounts to my machine.

#### Getting mu4e Up and Running
This part worked pretty much according to the documentation:
	
  * Initializing the message store with `mu init --maildir=~/Mails`
  * Check the settings with `mu info`
  * Indexing the messages with `mu index`
  * Adding additional mu4e settings to the Emacs configuration

  ```
  (add-to-list 'load-path "/usr/share/emacs/site-lisp/mu4e/mu4e")
  (require 'mu4e)

  ;; save attachment to my desktop (this can also be a function)
  (setq mu4e-attachment-dir "~/Desktop")

  ;; attempt to show images when viewing messages
  (setq mu4e-view-show-images t)

  ;; I have my "default" parameters from Gmail
  (setq mu4e-sent-folder "/[Gmail].Sent Mail"
	;; mu4e-sent-messages-behavior 'delete ;; Unsure how this should be configured
	mu4e-drafts-folder "/[Gmail].Drafts"
	mu4e-trash-folder "/[Gmail].Trash"
	user-mail-address "<user>@gmail.com"
	smtpmail-default-smtp-server "smtp.gmail.com"
	smtpmail-smtp-server "smtp.gmail.com"
	smtpmail-smtp-service 587)

  ;; Now I set a list of 
  (defvar my-mu4e-account-alist
    '(("<user>@gmail.com"
       (mu4e-sent-folder "/<user>@gmail.com/[Gmail].Sent Mail")
       (user-mail-address "<user>@gmail.com")
       (smtpmail-smtp-user "<user>")
       (smtpmail-local-domain "gmail.com")
       (smtpmail-default-smtp-server "smtp.gmail.com")
       (smtpmail-smtp-server "smtp.gmail.com")
       (smtpmail-smtp-service 587)
       )
      ;; Include any other accounts here ...
      ))

  (defun my-mu4e-set-account ()
    "Set the account for composing a message.
     This function is taken from: 
       https://www.djcbsoftware.nl/code/mu/mu4e/Multiple-accounts.html"
    (let* ((account
      (if mu4e-compose-parent-message
	  (let ((maildir (mu4e-message-field mu4e-compose-parent-message :maildir)))
      (string-match "/\\(.*?\\)/" maildir)
      (match-string 1 maildir))
	(completing-read (format "Compose with account: (%s) "
	       (mapconcat #'(lambda (var) (car var))
	      my-mu4e-account-alist "/"))
	     (mapcar #'(lambda (var) (car var)) my-mu4e-account-alist)
	     nil t nil nil (caar my-mu4e-account-alist))))
     (account-vars (cdr (assoc account my-mu4e-account-alist))))
      (if account-vars
    (mapc #'(lambda (var)
	(set (car var) (cadr var)))
	  account-vars)
	(error "No email account found"))))
  (add-hook 'mu4e-compose-pre-hook 'my-mu4e-set-account)
  ```


No Luck with Custom Domain Gmail Accounts
---
For some email addresses I use for professional purposes, I have
custom domain Gmail accounts that don't have end with @gmail.com. I
tried several things in different settings combinations... Conclusion:
It doesn't work.

#### Finding a Workaround to Make it Work
(to be continued)

