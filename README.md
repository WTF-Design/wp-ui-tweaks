# ![WP](wp-wtf-gradient-optimized.svg) WTF WP UI Tweaks
User script for augmenting WordPress development and administration.

## Requirements
- A user script host extension in your web browser
  - [Violentmonkey](https://violentmonkey.github.io/) is recommended

## Installation
- [Click here](https://github.com/WTF-Design/wordpress-ui-tweaks/raw/main/script.user.js) to install/update

## Features
- A login button for simple sites from simple developers

## Changelog
1.8.0
- Fix login symbol vertical alignment where affected by site styles.

1.7.0
- Improve login page detection by looking for `/wp-admin` instead of
  `/wp-login.php`. On tested sites the former seems to redirect to actual login
  page when it has been changed from the latter to something else
- Improve performance by reordering early exit conditions and removing
  unnecessary operations.

1.6.1
- Cleanup

1.6.0
- Finish animation cycle before pausing on mouseleave

1.5.0
- Animate login button on hover to give some user feedback

1.4.0
- Semantic versioning and improved logged-innes detection

1.3.20240910
- Supply in-house icon, disassociate from any official WP branding

1.2.20240906
- Don't run in iframes

1.1.20240905
- Switch to using a login icon instead of the WordPress one

1.0.20240904
- Initial release

## Aknowledgements
Uses [Google Material Symbols](https://fonts.google.com/icons) under the [Apache License Version 2.0](Google-Material-Symbols-LICENSE.txt) modified for animation.
