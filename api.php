<?php
$connection = new mysqli( "localhost", "root", "", "vue-php-crud" );

if ( $connection->connect_error ) {
    die( "ERROR: Could not connect to the database. " . $connection->connect_error );
}

$response = [ 'error' => false ];
$action   = "read";

if ( isset( $_GET['action'] ) ) {
    $action = $_GET['action'];
}

/**
 * Read All Contact
 */
if ( $action == 'read' ) {
    $result   = $connection->query( "SELECT * FROM `contact`" );
    $contacts = [];

    while ( $row = $result->fetch_assoc() ) {
        array_push( $contacts, $row );
    }

    $response['contacts'] = $contacts;
}

/**
 * Create Contact
 */
if ( $action == 'create' ) {
    $name  = $_POST['name'];
    $phone = $_POST['phone'];

    $insert = $connection->query( "INSERT INTO `contact` (`id`, `name`, `phone`) VALUES (NULL, '$name', '$phone')" );

    if ( $insert ) {
        $response['massage'] = "New contact added successfully.";
    } else {
        $response['error']   = true;
        $response['massage'] = "Could not added new contact.";
    }
}

/**
 * Update Contact
 */
if ( $action == 'update' ) {
    $id    = $_POST['id'];
    $name  = $_POST['name'];
    $phone = $_POST['phone'];

    $update = $connection->query( "UPDATE `contact` SET `name` = '$name', `phone` = '$phone' WHERE `id` = '$id'" );

    if ( $update ) {
        $response['massage'] = "Contact updated successfully.";
    } else {
        $response['error']   = true;
        $response['massage'] = "Could not update contact.";
    }
}

/**
 * Delete Contact
 */
if ( $action == 'delete' ) {
    $id    = $_POST['id'];

    $delete = $connection->query( "DELETE FROM `contact` WHERE `id` = '$id'" );

    if ( $delete ) {
        $response['massage'] = "Contact deleted successfully.";
    } else {
        $response['error']   = true;
        $response['massage'] = "Could not delete contact.";
    }
}

$connection->close();

header( "Connection-type: application/json" );
echo json_encode( $response );
die();