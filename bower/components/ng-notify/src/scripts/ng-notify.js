/**
 * @license ng-notify v0.4.0
 * http://matowens.github.io/ng-notify
 * (c) 2014 MIT License, matowens.com
 */
(function() {
    'use strict';

    /**
     * @description
     *
     * This module provides any AngularJS application with a simple, lightweight
     * system for displaying notifications of varying degree to it's users. 
     *
     */
     var module = angular.module('ngNotify', []);

     module.provider('ngNotify', function() {

        this.$get = ['$document', '$compile', '$rootScope', '$timeout', '$interval',

            function($document, $compile, $rootScope, $timeout, $interval) {

                // Defaults...

                var options = {
                    theme: 'pure',
                    position: 'bottom',
                    duration: 3000,
                    type: 'info',
                    sticky: false
                };

                // Options...

                var themes = {
                    pure: '',
                    prime: 'ngn-prime',
                    pastel: 'ngn-pastel',
                    pitchy: 'ngn-pitchy'
                };

                var types = {
                    infoClass: 'ngn-info',
                    errorClass: 'ngn-error',
                    successClass: 'ngn-success',
                    warnClass: 'ngn-warn',
                    grimaceClass: 'ngn-grimace'
                };

                var positions = {
                    bottom: 'ngn-bottom',
                    top: 'ngn-top'
                };

                // Fade params...

                var notifyTimeout;
                var notifyInterval;

                // Template and scope...

                var notifyScope = $rootScope.$new();
                var tpl = $compile(
                    '<div class="ngn" ng-class="ngNotify.notifyClass">' +
                        '<span class="ngn-dismiss" ng-click="dismiss()">&times;</span>' +
                        '<span>{{ ngNotify.notifyMessage }}</span>' +
                    '</div>'
                )(notifyScope);

                $document.find('body').append(tpl);

                // Private methods...

                /**
                 * Sets what type of notification do display, eg, error, warning, etc.
                 * 
                 * @param  {String} providedType - optional user provided type that will override our default value.
                 * @return {String}              - the type that will be assigned to this notification.
                 */
                var setType = function(providedType) {
                    var type = (providedType || options.type) + 'Class';
                    return types[type] || types.infoClass;
                };

                /**
                 * Sets the theme for a notification, eg, pure, pastel, etc.
                 * 
                 * @param  {String} providedTheme - optional user provided theme that will override our default value.
                 * @return {String}               - the theme that will be assigned to this notification.
                 */
                var setTheme = function(providedTheme) {
                    var theme = providedTheme || options.theme;
                    return themes[theme] || themes.pure;
                };

                /**
                 * Sets the position of the notification, eg, top or bottom.
                 * 
                 * @param  {String} providedPosition - optional user provided position that will override our default value.
                 * @return {String}                  - the position that will be assigned to this notification.
                 */
                var setPosition = function(providedPosition) {
                    var position = providedPosition || options.position;
                    return positions[position] || positions.bottom;
                };

                /**
                 * Sets how long (in ms) to display the notification for.
                 * 
                 * @param  {Integer} providedDuration - optional user provided number of ms a fade lasts.
                 * @return {Integer}                  - the number of ms a fade on this notification will last.
                 */
                var setDuration = function(providedDuration) {
                    var duration = providedDuration || options.duration;
                    return angular.isNumber(duration) ? duration : 3500;
                };

                /**
                 * Sets our notification's sticky state, forcing the user to dismiss it when enabled.
                 * 
                 * @param {Bool} providedSticky - boolean on whether or not sticky state should be enabled.
                 */
                var setSticky = function(providedSticky) {
                    var sticky = providedSticky || options.sticky;
                    return sticky ? true : false;
                };

                /**
                 * Resets our notification classes and message.
                 */
                var notifyReset = function() {
                    notifyScope.ngNotify = {
                        notifyClass: '',
                        notifyMessage: ''
                    };
                };

                // Pure JS fade functionality, support for IE8 included...

                /**
                 * Triggers our constructor to add our fade prototypes to our element.
                 * 
                 * @param  {Object} el - an element generated by our own template and bound to it's own scope.
                 * @return {Object}    - our element along with new fade prototype methods.
                 */
                var fadeLib = function(el) {
                    return new fadeLib.fn(el);
                };

                /**
                 * Our constructor that will allow us to invoke a fade on our element.
                 * 
                 * @param {Object} el - an element generated by our own template and bound to it's own scope.
                 */
                fadeLib.fn = function(el) {
                    this.el = el;
                };

                /**
                 * Handles the fading functionality and the duration for each fade. 
                 * 
                 * @param {Integer}  mode     - used to trigger fade in or out, adds or subtracts opacity until visible or hidden.
                 * @param {Integer   opacity  - initial opacity for our element.
                 * @param {Integer}  duration - how long the fade should take to complete, in ms.
                 * @param {Function} callback - function to invoke once our fade is complete.
                 */
                fadeLib.fn.prototype._fade = function(mode, opacity, duration, callback) {

                    var interval = 25;
                    var gap = interval / duration;
                    var el = this.el;

                    el.css('opacity', opacity);

                    var func = function() {

                        opacity = opacity + mode * gap;

                        el.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')'); // IE8
                        el.css('opacity', opacity);

                        if (opacity <= 0 || opacity >= 1) {
                            $interval.cancel(notifyInterval);

                            if (opacity <= 0) {
                                el.css('display', 'none');
                            }

                            if (callback) { 
                                callback(); 
                            }
                        }
                    };

                    notifyInterval = $interval(func, interval);
                };

                /**
                 * Triggers a fade in, opacity from 0 to 1.
                 * 
                 * @param  {Integer}  duration - how long the fade should take to complete, in ms.
                 * @param  {Function} callback - function to invoke once fade has completed.
                 */
                fadeLib.fn.prototype.fadeIn = function(duration, callback) {
                    this.el.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)');
                    this.el.css('display', 'block');
                    this._fade(1, 0, duration, callback);
                };

                /**
                 * Triggers a fade out, opacity from 1 to 0.
                 * 
                 * @param  {Integer}  duration - how long the fade should take to complete, in ms.
                 * @param  {Function} callback - function to invoke once fade has completed.
                 */
                fadeLib.fn.prototype.fadeOut = function(duration, callback) {
                    this._fade(-1, 1, duration, callback);
                };

                /**
                 * Dismisses our notification when called, attached to scope for ngCLick event to trigger.
                 * 
                 */
                notifyScope.dismiss = function() {
                    el.fadeOut(500, function() {
                        notifyReset();
                    });
                };

                /**
                 * Our template bound to it's own personal scope and receiving our fade protoype functions.
                 * 
                 * @type {Object}
                 */
                var el = fadeLib(tpl);

                /**
                 * Our primary object containing all public API methods and allows for all our functionality to be invoked.
                 * 
                 * @type {Object}
                 */
                var notifyObject = {

                    /**
                     * Merges our user specified options with our default set of options.
                     * 
                     * @param {Object} params - object of user provided options to configure notifications.
                     */
                    config: function(params) {
                        params = params || {};
                        angular.extend(options, params);
                    },

                    /**
                     * Sets, configures and displays each notification.
                     * 
                     * @param {String}             message - the message our notification will display to the user.
                     * @param {String|Object|null} userOpt - optional parameter that contains the type or an object of options used to configure this notification. 
                     */
                    set: function(message, userOpt) {

                        if (!message) {
                            return;
                        }

                        $interval.cancel(notifyInterval);
                        $timeout.cancel(notifyTimeout);

                        var userOpts = {};

                        if (typeof userOpt === 'object') {
                            userOpts = {
                                type: userOpt.type || undefined,
                                theme: userOpt.theme || undefined,
                                position: userOpt.position || undefined,
                                duration: userOpt.duration || undefined,
                                sticky: userOpt.sticky || undefined
                            };
                        } else {
                            userOpts.type = userOpt;
                        }

                        var sticky = setSticky(userOpts.sticky);
                        var duration = setDuration(userOpts.duration);
                        var notifyClass = setType(userOpts.type) + ' ' + 
                                          setTheme(userOpts.theme) + ' ' +
                                          setPosition(userOpts.position);

                        notifyClass += sticky ? ' ngn-sticky' : '';

                        notifyScope.ngNotify = {
                            notifyClass: notifyClass,
                            notifyMessage: message
                        };

                        el.fadeIn(200, function() {
                            if (!sticky) {
                                notifyTimeout = $timeout(function() {
                                    notifyScope.dismiss();
                                }, duration);
                            }
                        });
                    },

                    /**
                     * Allows a developer to manually dismiss a notification that may be 
                     * set to sticky, when the message is no longer warranted.
                     */
                    dismiss: function() {
                        notifyScope.dismiss();
                    },

                    // User customizations...

                    /**
                     * Adds a new, user specified theme to our notification system 
                     * that they can then use throughout their application.
                     * 
                     * @param {String} themeName  - the name for this new theme that will be used when applying it via configuration.
                     * @param {String} themeClass - the class that this theme will use when applying it's styles.
                     */
                    addTheme: function(themeName, themeClass) {
                        if (!themeName || !themeClass) { return; }
                        themes[themeName] = themeClass;
                    },

                    /**
                     * Adds a new, user specified notification type that they
                     * can then use throoughout their application.
                     * 
                     * @param {String} typeName  - the name for this new type that will be used when applying it via configuration.
                     * @param {String} typeClass - the class that this type will use when applying it's styles.
                     */
                    addType: function(typeName, typeClass) {
                        if (!typeName || !typeClass) { return; }
                        types[typeName + 'Class'] = typeClass;
                    }

                };

                return notifyObject;
            }
        ];
     });
})();
