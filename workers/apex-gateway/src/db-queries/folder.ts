import { eq } from 'drizzle-orm';
import { Env } from '..';
import { getDrizzleClient } from '../db-schema/db-client';
import { FolderSelectType, folderTable } from '../db-schema/schema';

export async function getFolderById(folderId: number, env: Env): Promise<FolderSelectType> {
  const db = getDrizzleClient(env);
  const folder = await db.select().from(folderTable).where(eq(folderTable.id, folderId)).get();
  if (!folder) {
    throw new FolderNotFoundException(`Folder with id ${folderId} not found`);
  }
  return folder;
}

export async function getFolderByPath(folderPath: string, env: Env): Promise<FolderSelectType> {
  const db = getDrizzleClient(env);
  const folder = await db.select().from(folderTable).where(eq(folderTable.path, folderPath)).get();
  if (!folder) {
    throw new FolderNotFoundException(`Folder with path ${folderPath} not found`);
  }
  return folder;
}

export class FolderNotFoundException extends Error {}