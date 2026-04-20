<?php
declare(strict_types=1);

/**
 * Database Connection Handler
 * Uses MySQLi for database operations
 */

class Database {
    private static $instance = null;
    private $connection;
    
    private $host;
    private $name;
    private $username;
    private $password;
    private $charset;
    
    private function __construct() {
        $config = require __DIR__ . '/config.php';
        
        $this->host = $config['db']['host'];
        $this->name = $config['db']['name'];
        $this->username = $config['db']['username'];
        $this->password = $config['db']['password'];
        $this->charset = $config['db']['charset'];
        
        $this->connect();
    }
    
    /**
     * Get singleton instance of Database
     */
    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Establish database connection
     */
    private function connect(): void {
        $this->connection = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            $this->name
        );
        
        if ($this->connection->connect_error) {
            error_log("Database Connection Error: " . $this->connection->connect_error);
            throw new Exception("Database connection failed");
        }
        
        $this->connection->set_charset($this->charset);
    }
    
    /**
     * Get the database connection
     */
    public function getConnection(): mysqli {
        return $this->connection;
    }
    
    /**
     * Escape string for safe SQL queries
     */
    public function escape(string $value): string {
        return $this->connection->real_escape_string($value);
    }
    
    /**
     * Get last inserted ID
     */
    public function getLastInsertId(): int {
        return (int) $this->connection->insert_id;
    }
    
    /**
     * Close database connection
     */
    public function close(): void {
        if ($this->connection) {
            $this->connection->close();
        }
    }
    
    /**
     * Prevent cloning
     */
    private function __clone() {}
    
    /**
     * Prevent unserialization
     */
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}

/**
 * Helper function to get database instance
 */
function db(): Database {
    return Database::getInstance();
}
