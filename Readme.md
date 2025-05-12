# File Manager

A command-line file manager built with Node.js that provides basic file operations, OS information, hash calculations, and file compression/decompression capabilities.

## Features

- Navigation and directory operations
- Basic file operations (read, create, rename, copy, move, delete)
- OS information retrieval
- File hash calculation
- File compression and decompression using Brotli algorithm
- Command auto-completion

## Requirements

- Node.js v22.14.0 or higher

## Installation

1. Clone this repository
2. No external dependencies are required

## Usage

Start the File Manager with your username:

```bash
npm run start -- --username=your_username
```

### Available Commands

#### Navigation & Working Directory
- `up` - Go up one directory
- `cd path_to_directory` - Change to specified directory
- `ls` - List files and directories in current directory

#### File Operations
- `cat path_to_file` - Display file content
- `add new_file_name` - Create empty file
- `mkdir new_directory_name` - Create new directory
- `rn path_to_file new_filename` - Rename file
- `cp path_to_file path_to_new_directory` - Copy file
- `mv path_to_file path_to_new_directory` - Move file
- `rm path_to_file` - Delete file

#### OS Information
- `os --EOL` - Display system End-Of-Line character
- `os --cpus` - Display CPU information
- `os --homedir` - Display home directory
- `os --username` - Display system username
- `os --architecture` - Display CPU architecture

#### Hash Calculation
- `hash path_to_file` - Calculate SHA-256 hash for file

#### Compression
- `compress path_to_file path_to_destination` - Compress file using Brotli
- `decompress path_to_file path_to_destination` - Decompress file using Brotli

#### Exit
- `.exit` - Exit program
- Press `Ctrl+C` - Exit program

## Command Completion

The File Manager includes a command completion feature. When typing a command, press Tab to:
- See available commands matching your current input
- Autocomplete commands when there's only one match
- Cycle through possible command completions


## Limitations

- File paths with spaces should be enclosed in quotes
- Cannot navigate above the root directory
- Command arguments cannot be validated extensively

## License

This project is available under the MIT License.