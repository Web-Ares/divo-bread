$( function() {

    "use strict";

    $( function() {

        $.each( $( '.menu-btn' ), function() {
            new Menu ( $( this ) );
        } );

        $.each( $( '.accordion' ), function() {
            new Accordion ( $( this ) );
        } );

        new Location( $( '.road-map__google' ) );

    } );

    var Menu = function( obj ) {

        //private properties
        var _obj = obj,
            _menu = $( '.menu' ),
            _window = $( window );

        //private methods
        var _initSlider = function() {

                _obj.on( {
                    'click': function() {

                        if ( _obj.hasClass( 'menu-btn_close' ) ) {

                            _obj.removeClass( 'menu-btn_close' );
                            _menu.removeClass( 'menu_visible' );

                        } else {

                            _obj.addClass( 'menu-btn_close' );
                            _menu.addClass( 'menu_visible' );

                            if ( _menu.height() - 10 > _window.height() ) {
                                _initContentScroll();
                                $( _menu ).getNiceScroll().show();
                            } else {
                                $( _menu ).getNiceScroll().hide();
                            }

                        }
                    }
                } ),
                    _window.on( {
                        'resize': function() {

                            if ( _menu.height() - 10 > _window.height() && _obj.hasClass( 'menu-btn_close' ) ) {
                                _initContentScroll();
                                $( _menu ).getNiceScroll().show();
                            } else {
                                $( _menu ).getNiceScroll().hide();
                            }

                        }
                    } )

            },
            _initContentScroll = function() {
                $( _menu ).niceScroll( {
                    autohidemode: 'false',
                    cursorborder: '',
                    cursorcolor: "#fff",
                    cursorwidth: "6px",
                    cursorborderradius: "0"
                } );
            },
            _init = function() {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var Accordion = function( obj ) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( 'dt' );

        //private methods
        var _addEvents = function() {

                _btn.on( {
                    'click': function() {

                        var curElem = $(this),
                            next = curElem.next();

                        if ( curElem.hasClass( 'active' ) ) {

                            curElem.removeClass( 'active' );
                            next.slideUp();

                        } else {

                            curElem.addClass( 'active' );
                            next.slideDown();

                        }
                    }
                } );

            },

            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };


    var Location = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _map = _obj.find('#contact-google-map'),
            _mapLat = _map.data('map-lat'),
            _mapLng = _map.data('map-lng'),
            _mapZoom = _map.data('map-zoom'),
            _btn = $('[data-popup = "maps"]'),
            map,
            marker;

        //private methods
        var _addEvents = function () {

                _btn.on( {
                    click: function () {
                        var myLatLng = {lat: $(this).data('map-lat'), lng: $(this).data('map-lng')};
                        marker.setPosition(myLatLng);

                        setTimeout( function() {
                            google.maps.event.trigger(map, 'resize');
                            map.setCenter(myLatLng);
                        }, 300 );


                    }
                } );

            },
            _initMap = function () {
                var customMapType = new google.maps.StyledMapType([
                    {
                        stylers: [
                            {hue: '#f6d38a'},
                            {visibility: 'simplified'},
                            {gamma: 1},
                            {weight: 1}
                        ]
                    },
                    {
                        //featureType: 'water',
                        //stylers: [{color: '#f2dcad'}]
                    }
                ], {
                    name: 'Custom Style'
                });
                var customMapTypeId = 'custom_style';

                map = new google.maps.Map( _map[0], {
                    zoom: _mapZoom,
                    center: {lat: _mapLat, lng: _mapLng},
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
                    }
                });

                marker = new google.maps.Marker({
                    position: {lat: _mapLat, lng: _mapLng},
                    map: map
                });

                map.mapTypes.set(customMapTypeId, customMapType);
                map.setMapTypeId(customMapTypeId);

            },
            _init = function () {
                google.maps.event.addDomListener(window, 'load', _initMap);
                _addEvents();
            };

        _init();
    };

} );