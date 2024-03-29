# pt-link-helper
Chrome plugin to help with aspects of linking to and from Pivotal Tracker

## Installation
1. Clone the repo to local folder
2. `chrome://extensions/`
3. Turn on `Developer mode`
4. Click `Load Unpacked`
5. Select the local folder you used for the clone.

Once installed. Refresh any page you wish to use the extension in. 

The following features will be available/visible in Chrome while the extension is loaded.

## PT Paste Helper
1. Get any URL on the clipbard. Eg: google doc url.
2. In PT text box (comment, description etc), select link text and paste.
3. Selected text will be replaced with Markdown for the link.

## PT Copy Link Helper (extension)
The native copy link helper in PT gets only the URL. This extension adds the ability to build a link (both html and markdown) with the story name in it. 
1. Hold CTRL key down when clicking the Copy Link button on any Story or Epic.
2. The link will be placed on the clipboard in both HTML and Plain text (markdown).
3. Paste into target (gdoc, email etc).

## Modest styling tweaks
1. Make links in tracker markup more discoverable (underline them).
2. Trim the @ symbol prefix from username headers. ie Remove the [Stroop effect](https://en.wikipedia.org/wiki/Stroop_effect) nature of the @ prefix PT puts on comment authors. 
