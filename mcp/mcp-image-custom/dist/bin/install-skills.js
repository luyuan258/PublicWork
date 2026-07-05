"use strict";
/**
 * Image Generation Skills Installer
 *
 * Installs image-generation skills to the specified path.
 *
 * Usage:
 *   npx mcp-image skills install --path <path>
 *   npx mcp-image skills install --path ~/.claude/skills
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// Skills source directory (relative to dist/bin when compiled)
// dist/bin/install-skills.js -> skills/image-generation
const SKILLS_SOURCE = (0, node_path_1.resolve)(__dirname, '..', '..', 'skills', 'image-generation');
const SKILL_DIR_NAME = 'image-generation';
function printHelp() {
    console.log(`
Image Generation Skills Installer

Usage:
  npx mcp-image skills install --path <path>

Options:
  --path <path>    Install skills to the specified directory.
                   The skill will be placed at <path>/image-generation/

  --help, -h       Show this help message

Examples:
  npx mcp-image skills install --path ~/.claude/skills
  npx mcp-image skills install --path ./.claude/skills
  npx mcp-image skills install --path /custom/path
`);
}
function parseArgs(args) {
    const options = { help: false };
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case '--help':
            case '-h':
                options.help = true;
                break;
            case '--path': {
                const pathArg = args[i + 1];
                if (!pathArg) {
                    console.error('Error: --path requires a path argument');
                    process.exit(1);
                }
                options.path = pathArg;
                i++;
                break;
            }
            default:
                if (arg?.startsWith('-')) {
                    console.error(`Unknown option: ${arg}`);
                    process.exit(1);
                }
        }
    }
    return options;
}
function install(targetPath) {
    if (!(0, node_fs_1.existsSync)(SKILLS_SOURCE)) {
        console.error(`Error: Skills source not found at ${SKILLS_SOURCE}`);
        process.exit(1);
    }
    const targetDir = (0, node_path_1.dirname)(targetPath);
    if (!(0, node_fs_1.existsSync)(targetDir)) {
        (0, node_fs_1.mkdirSync)(targetDir, { recursive: true });
        console.log(`Created directory: ${targetDir}`);
    }
    (0, node_fs_1.cpSync)(SKILLS_SOURCE, targetPath, { recursive: true });
    console.log(`Installed skills to: ${targetPath}`);
}
/**
 * Run the skills installer with the given arguments
 */
function run(args) {
    if (args.length === 0) {
        printHelp();
        process.exit(0);
    }
    const options = parseArgs(args);
    if (options.help) {
        printHelp();
        process.exit(0);
    }
    if (!options.path) {
        console.error('Error: --path is required');
        console.error('Run "npx mcp-image skills install --help" for usage information.');
        process.exit(1);
    }
    const targetPath = (0, node_path_1.resolve)(options.path, SKILL_DIR_NAME);
    console.log('Installing image-generation skills...');
    console.log(`Path: ${targetPath}`);
    console.log();
    install(targetPath);
    console.log();
    console.log('Installation complete!');
    console.log();
    console.log('Installed files:');
    console.log('  - image-generation/SKILL.md');
}
//# sourceMappingURL=install-skills.js.map