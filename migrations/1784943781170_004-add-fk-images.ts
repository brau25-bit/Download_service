import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addConstraint('images', 'fk_images_chapters', {
        foreignKeys: {
            columns: 'chapter_id',
            references: 'chapters(id)',
            onDelete: 'CASCADE'
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint('images', 'fk_images_chapters');
}
