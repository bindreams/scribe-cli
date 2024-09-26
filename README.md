# Scribe OCR (CLI)
This is a CLI interface for [Scribe OCR](https://github.com/scribeocr/scribeocr) which allows you to scan a single document on the command line.

On Linux, you can install and run the script directly:
```bash
npm install
cat source.pdf | node main.js --lang por --format txt > output.txt
```
My testing shows that you will need Node 20 (not later) for this.

On other systems, I recommend building and running a Docker image:
```bash
docker build -t scribe-cli .
cat source.pdf | docker run --rm -i scribe-cli --lang por --format txt > output.txt
```
Note: piping files in PowerShell may not work correctly, unless you use a posix shell like Git Bash or WSL.
