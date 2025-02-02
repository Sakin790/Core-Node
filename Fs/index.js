
import { promises as fs } from 'fs';

async function checkFileStats() {
  try {
    const stats = await fs.stat('index.txt');
    console.log(stats);
  } catch (error) {
    console.error('Error fetching the file stats:', error);
  }
}

checkFileStats();