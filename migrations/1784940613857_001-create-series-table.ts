import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('series', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        source: {
            type: 'varchar',
            notNull: true
        },
        title: {
            type: 'varchar',
            notNull: true
        },
        cover: {
            type: 'varchar'
        },
        serie_url: {
            type: 'varchar'
        },
        system_path: {
            type: 'varchar', 
            notNull: true
        },
        created: {
            type: 'timestamp', 
            notNull: true, 
            default: pgm.func('current_timestamp')
        },
        update_at: {
            type: 'timestamp', 
            notNull: true, 
            default: pgm.func('current_timestamp')
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
