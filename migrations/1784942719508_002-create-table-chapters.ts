import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('chapters', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        serie_id: {
            type: 'uuid',
            notNull: true,
            references: 'series',
            onDelete: 'CASCADE'    
        },
        chapter_url: {
            type: 'varchar',
            notNull: true,
        },
        chapter_number: {
            type: 'int',
            notNull: true
        },
        system_path: {
            type: 'varchar',
            notNull: true
        },
        created: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
