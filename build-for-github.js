const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Beginning GitHub Pages build process...');

// Step 1: Build the project using the github-pages-vite-config.ts
console.log('Building project with GitHub Pages configuration...');
try {
  execSync('npx vite build --config github-pages-vite-config.ts', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Step 2: Copy 404.html to docs folder
console.log('Copying 404.html to docs folder...');
try {
  fs.copyFileSync(
    path.join(__dirname, 'public', '404.html'),
    path.join(__dirname, 'docs', '404.html')
  );
  console.log('✅ 404.html copied successfully!');
} catch (error) {
  console.error('❌ Failed to copy 404.html:', error);
  process.exit(1);
}

// Step 3: Optionally copy audio files (if needed, uncomment this section)
/*
console.log('Copying audio files to docs folder...');
try {
  const audioSourceDir = path.join(__dirname, 'public', 'audio');
  const audioDestDir = path.join(__dirname, 'docs', 'audio');
  
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(audioDestDir)) {
    fs.mkdirSync(audioDestDir, { recursive: true });
  }
  
  // Copy music folder
  const musicSourceDir = path.join(audioSourceDir, 'music');
  const musicDestDir = path.join(audioDestDir, 'music');
  if (!fs.existsSync(musicDestDir)) {
    fs.mkdirSync(musicDestDir, { recursive: true });
  }
  
  const musicFiles = fs.readdirSync(musicSourceDir);
  musicFiles.forEach(file => {
    fs.copyFileSync(
      path.join(musicSourceDir, file),
      path.join(musicDestDir, file)
    );
  });
  
  // Copy sfx folder with subfolders
  const sfxSourceDir = path.join(audioSourceDir, 'sfx');
  const sfxDestDir = path.join(audioDestDir, 'sfx');
  if (!fs.existsSync(sfxDestDir)) {
    fs.mkdirSync(sfxDestDir, { recursive: true });
  }
  
  const sfxCategories = fs.readdirSync(sfxSourceDir);
  sfxCategories.forEach(category => {
    const categorySourceDir = path.join(sfxSourceDir, category);
    const categoryDestDir = path.join(sfxDestDir, category);
    
    if (fs.statSync(categorySourceDir).isDirectory()) {
      if (!fs.existsSync(categoryDestDir)) {
        fs.mkdirSync(categoryDestDir, { recursive: true });
      }
      
      const sfxFiles = fs.readdirSync(categorySourceDir);
      sfxFiles.forEach(file => {
        fs.copyFileSync(
          path.join(categorySourceDir, file),
          path.join(categoryDestDir, file)
        );
      });
    }
  });
  
  console.log('✅ Audio files copied successfully!');
} catch (error) {
  console.error('❌ Failed to copy audio files:', error);
  process.exit(1);
}
*/

console.log('📦 GitHub Pages build completed!');
console.log('');
console.log('Next steps:');
console.log('1. Create a new GitHub repository');
console.log('2. Push all files to the repository');
console.log('3. Enable GitHub Pages in repository settings');
console.log('4. Set GitHub Pages to deploy from the main branch /docs folder');
console.log('');
console.log('Remember to update the Formspree form endpoints in utils.ts before deploying!');