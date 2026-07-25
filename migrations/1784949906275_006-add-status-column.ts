import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn('series', {
        status: {
            type: 'varchar',
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn('series', 'status', {
        ifExists: true
    })
}
