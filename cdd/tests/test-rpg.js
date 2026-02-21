// Testes do sistema RPG
describe('CDD 3001 RPG System', () => {
    
    test('XP system should level up correctly', () => {
        const player = new CDDRPG();
        const initialLevel = player.jogador.nivel;
        player.ganharXP(1000);
        expect(player.jogador.nivel).toBe(initialLevel + 1);
    });
    
    test('Combat system should calculate damage', () => {
        const combat = new SistemaCombate();
        const dano = combat.calcularDano(10, 5);
        expect(dano).toBeGreaterThan(0);
    });
    
    test('Inventory should store items', () => {
        const inv = new Inventario();
        inv.adicionar('faca');
        expect(inv.itens).toContain('faca');
    });
    
});
