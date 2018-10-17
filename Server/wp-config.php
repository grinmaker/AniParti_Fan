<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'aniparti_fan');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'ANi@!321');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'r_N2YOM{OQ>#knylU2e*8_= ePDN*!;vUwi){x9tVGu?a,5j_<y@)M)#l6x[uZ]q');
define('SECURE_AUTH_KEY',  '182::?e86ui&(%;RP[;98b2k3%1Y fH8N^z:ym<.5sq<9Vt+=:A&$I{Soths[<=V');
define('LOGGED_IN_KEY',    'PXx=Mnp+s3@^nu/imB1g#yji7;l/CnDQ}b5JFfA%B`Ru455vWr1EEfjv]I+wH?kb');
define('NONCE_KEY',        'HZ>7vGJQb?@rSA*H/7.juXR |%{=?`Hz!T~C!]J4JJL -dplnl*K45sSIG.>$i9g');
define('AUTH_SALT',        'S]u5#i5A>_D[]wn-Www:g>xZiVN`U&? (X-lVM;eY7)BTQ}q&[_9cYyXgfa5fMo?');
define('SECURE_AUTH_SALT', 'zaY7a2q9L{L6::0 &qeWXhX0CpZYN[N@ &Jj@18re:)>lQGOb-I<0zl6hLQI7{3r');
define('LOGGED_IN_SALT',   'SIy#Prf4n%koG.+YDFyT..Aq;jg4-5PG)-Dpf)b|SmlmMx$lg20wiKPMsBPX:#4i');
define('NONCE_SALT',       'b,-_WY/NC`D?iQppye{7YM7ba0*t![}YPjrDn59Ub6?sT%Z:e;TF)#pG+CKwe1 a');
define('JWT_AUTH_SECRET_KEY', 'r{6Q#M7G+$4B`K^');
define('JWT_AUTH_CORS_ENABLE', true);
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';
define('WP_ALLOW_REPAIR', true);
define('FS_METHOD', 'direct');
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
