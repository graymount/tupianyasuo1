# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side image compression tool ("图片压缩工具") that operates entirely in the browser. The application is designed specifically for Chinese-speaking users (students, teachers, and parents) and branded as "yasuo.photos".

## Architecture

The project is a single-page web application with no build process or server-side components:

- **Frontend-only**: Pure HTML, CSS, and vanilla JavaScript
- **Client-side processing**: All image compression happens in the browser using Canvas API
- **No external dependencies**: JSZip is loaded dynamically from CDN when needed for multi-file downloads

### File Structure

- `index.html` - Main application interface with Chinese UI
- `script.js` - Core application logic for image processing and UI interactions
- `styles.css` - Complete styling with CSS custom properties and responsive design
- `upload-icon.svg` - Upload area icon
- `README.md` - Project documentation in Chinese

### Key Components

1. **Image Upload**: Drag-and-drop or click-to-select interface supporting PNG and JPEG
2. **Batch Processing**: Handles multiple images simultaneously with navigation controls
3. **Compression Engine**: 
   - JPEG: Uses Canvas quality parameter (0-1 scale)
   - PNG: Resizes dimensions based on quality setting (50%-100% of original size)
4. **Preview System**: Side-by-side comparison of original vs compressed images
5. **Download System**: Individual downloads or ZIP archive for multiple files

### State Management

The application maintains several key state variables in `script.js`:
- `allImages[]` - Original file information and cached data
- `compressedImages[]` - Processed image blobs and metadata
- `currentImageIndex` - Active image in multi-image mode
- `currentQuality` - Compression level (0.0-1.0)

## Development

### Running Locally

Open `index.html` directly in a web browser - no build process or server required.

### Browser Compatibility

The application uses:
- Canvas API for image processing
- FileReader API for file handling
- Blob/Object URLs for downloads
- Modern JavaScript (ES6+ features)

Ensure testing in modern browsers that support these APIs.

### Key Implementation Details

1. **Compression Strategy**: Different approaches for JPEG (quality) vs PNG (resizing)
2. **Memory Management**: Uses `URL.revokeObjectURL()` to prevent memory leaks
3. **Dynamic Loading**: JSZip library loads on-demand for ZIP functionality
4. **Responsive Design**: CSS Grid and Flexbox with mobile-first approach
5. **Chinese Localization**: All UI text in Simplified Chinese

### Modification Guidelines

- Maintain the existing vanilla JavaScript approach (no frameworks)
- Preserve Chinese language interface
- Keep client-side only architecture
- Follow existing CSS custom property naming conventions
- Maintain responsive design principles for mobile users