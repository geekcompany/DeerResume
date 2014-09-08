ng-notify
=========

A simple, lightweight module for displaying notifications in your AngularJS app.

Both JS and CSS files combine for < 4 kBs.

IE8+ and the latest versions of Chrome, FireFox and Safari have been tested and are supported.  If you do run across any issues, please submit a [new issue](https://github.com/matowens/ng-notify/issues) and I'll take a look.

You can check out the demo here: [http://matowens.github.io/ng-notify](http://matowens.github.io/ng-notify)

New in v0.4.0 are **sticky notifications**.  When enabled, notifications won't fade out until the user dismisses them.  This, too, can be set as a default option for all notifications or just set for individual notifications on a case by case basis.  For more on how to use this sticky feature, check out the [Sticky Notifications](#sticky-notifications) section below.  For more on updates, head on over to the [changelog](https://github.com/matowens/ng-notify/blob/master/CHANGELOG.md).

Implementation
==============

###Requirements

AngularJS is the only dependency.  Animation is achieved with pure JS, jQuery not necessary.

###Installation

You can install ng-notify with Bower.

    bower install ng-notify --save

You can also download source files straight from this repo, they're located in the `dist` dir.  Just include the minified version of both js and css files.

###Usage

After including *ng-notify.min.js* and *ng-notify.min.css*, inject the ng-notify provider into your project.

    var app = angular.module('demo', ['ngNotify']);

Now you can trigger notifications from anywhere in your app.  To display a notification, just use the `set` method.

    ngNotify.set('Your notification message goes here!');

To specify the *type* of notification to display, provide the optional *type* param. (For available types, check the [definitions](#definitions) below.)

    ngNotify.set('Your error message goes here!', 'error');

Advanced Usage
==============

###Default Configuration

You can override the default options for all notifications by using the `config` method.  None of these options are required. (For available options, check the [definitions](#definitions) below.)

    ngNotify.config({
        theme: 'pure',
        position: 'bottom',
        duration: 3000,
        type: 'info',
        sticky: false
    });

###Individual Configurations

You can also pass an object of options to individual notifications.  You can pass through any combination of our available options here as well.  (For available options, check the [definitions](#definitions) below.)  For example:

    ngNotify.set('Your first message.', {
        position: 'top',
        sticky: true
    });

    ngNotify.set('Your second message.', {
        type: 'error',
        duration: 2000
    });

    ngNotify.set('Your third message.', 'error'); // Original use case still works, too.

    ngNotify.set('Your fourth message.', {
        theme: 'pitchy'
    });

###Sticky Notifications

Sticky notifications allow you to set a perisistant notification that doesn't fade away.  To do this, simply set the `sticky` attribute to true:

    ngNotify.set('This is sticky.', {
        sticky: true
    });

This will give the user the option of closing the notification themselves.  If you need to dismiss a notification manually, you can do so with the `dismiss` method like this:
    
    ngNotify.dismiss();

*Any time a notification is set to sticky, the duration attribute will be ignored since the notification will not be automatically fading out.*

###Roll Your Own

There are two additional methods that allow you to create your own types and themes.

#####Custom Notification Types

Creating a custom type will allow you to add additional types of notifications to use throughout your application.  To create a new type, use the `addType` method.  The first param is the *name* you'll use to reference your new type.  The second param is the *class* you'll use to style your new notification type.

    ngNotify.addType('notice', 'my-notice-type');

Then you can set any of your notifications up to use that type as you would any other, triggering it by using the name you gave it.

    ngNotify.set('This notification is using our new type!', 'notice');

To style your new type, pick a color you'd like to use and set it to the background color of your new style.

    .my-notice-type
        background-color: #ABC123

#####Custom Themes

Creating a custom theme will allow you to build an entirely new spectrum of notification messages utilizing the existing notification types.  To create a new theme, use the `addTheme` method.  The first param is the *name* you'll use to reference your new theme.  The second param is the *class* you'll use to style your new theme's notification types.

    ngNotify.addTheme('newTheme', 'my-new-theme');

Now you can activate your new theme via the config method, using the name you previously assigned to it.

    ngNotify.config({
        theme: 'newTheme'
    });

To style your new theme, pick a collection of colors you'd like to use for each notification type and set them to each type's background color.

    .my-new-theme.ngn-info
        background-color: #0033CC

    .my-new-theme.ngn-error
        background-color: #FF0000

    .my-new-theme.ngn-success
        background-color: #00CC00

    .my-new-theme.ngn-warn
        background-color: #FF9900

    .my-new-theme.ngn-grimace
        background-color: #660099

#####Custom Styles

The position, size, color, alignment and more are all styled based on the notification's classes and are all specified in the CSS file. See the [style definitions](#styles) below to see which classes can be used to override any of the styles within your own application.

Definitions
===========

###Methods

####set(message, type)
displays a notification message and sets the formatting/behavioral options for this one notification.
- **message**: *string* - *required* - the message to display in your notification.
- **type**: *string* - *optional* - the type of notification to display.
    - info *(default)*
    - error
    - success
    - warn
    - grimace

####config(options)
sets default settings for all notifications to take into account when displaying.
- **options** - *object* - an object of options that overrides the default settings.
    - **theme**: *string* - *optional* - sets the theme to use, altering the styles for each notification type.
        - pure *(default)*
        - prime
        - pastel
        - pitchy
    - **type**: *string* - *optional* - sets the default notification type when a type isn't explicitly set.
        - info *(default)*
        - error
        - success
        - warn
        - grimace
    - **position**: *string* - *optional* - sets where the notifications will be displayed at in the app.
        - bottom *(default)*
        - top
    - **duration**: *integer* - *optional* - the duration the notification stays visible to the user, in milliseconds.
    - **sticky**: *bool* - *optional* - determines whether or not the message will fade at the end of the duration or if the message will persist until the user dismisses it themselves.  when true, duration will not be set, even if it has a value. *(false by default)*.

####dismiss() 
manually dismisses any sticky notifications that may still be set.

####addType(name, class)
allows a dev to create a new type of notification to use in their app.
- **name**: *string* - *required* - the name used to trigger this notification type in the *set* method.
- **class**: *string* - *required* - the class used to target this type in the stylesheet.

####addTheme(name, class)
allows a dev to create a whole new set of styles for each notification type.
- **name**: *string* - *required* - the name used when setting the theme in the *config* object.
- **class**: *string* - *required* - the class used to target this theme in the stylesheet.

###Styles

- **primary**: the class that's present on every notification and controls all of the primary styles.
    - *.ngn* 

- **position**: purely responsible for where notifications are displayed.  *default is set to bottom, one is present on every notification.*
    - *.ngn-top*
    - *.ngn-bottom* 

- **types**: default classes for setting each notification type's background color.  *default is set to info, one is present on every notification.*
    - *.ngn-info*
    - *.ngn-error*
    - *.ngn-success*
    - *.ngn-warn*
    - *.ngn-grimace*

- **themes**: theme specific classes that are chained together with type classes to override default background colors.  *not always present, default excludes all of these.*
    - *.ngn-prime*
    - *.ngn-pastel*
    - *.ngn-pitchy*

- **sticky**: styles responsible for displaying the dismissal button for sticky notifications.
    - *.ngn-sticky* - displays the dismissal button when sticky is enabled.
    - *.ngn-dismiss* - styles the dismissal button.
