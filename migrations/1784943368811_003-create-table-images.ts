import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('images', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        chapter_id: {
            type: 'uuid',
            notNull: true
        },
        img_url: {
            type: 'varchar',
            notNull:true
        },
        img_number: {
            type: 'int',
            notNull: true
        },
        system_path: {
            type: 'varchar'
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
