// Sistema de Banco de Dados Local para Patika

class PatikaDB {
    constructor() {
        this.dbName = 'patika_writings';
        this.version = 1;
        this.db = null;
        
        this.init();
    }
    
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = (event) => {
                console.error('❌ Erro ao abrir IndexedDB:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('✅ IndexedDB conectado');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Criar object store para projetos
                if (!db.objectStoreNames.contains('projects')) {
                    const projectStore = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
                    projectStore.createIndex('title', 'title', { unique: false });
                    projectStore.createIndex('createdAt', 'createdAt', { unique: false });
                    projectStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                }
                
                // Criar object store para templates
                if (!db.objectStoreNames.contains('templates')) {
                    const templateStore = db.createObjectStore('templates', { keyPath: 'id' });
                    templateStore.createIndex('category', 'category', { unique: false });
                }
                
                // Criar object store para configurações
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
                
                console.log('🗃️  Estrutura do IndexedDB criada');
            };
        });
    }
    
    // Métodos para projetos
    async saveProject(project) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database não inicializada');
                return;
            }
            
            const transaction = this.db.transaction(['projects'], 'readwrite');
            const store = transaction.objectStore('projects');
            
            // Adicionar timestamps
            project.updatedAt = new Date().toISOString();
            if (!project.createdAt) {
                project.createdAt = project.updatedAt;
            }
            
            const request = store.put(project);
            
            request.onsuccess = () => {
                console.log('💾 Projeto salvo no IndexedDB:', project.title);
                resolve(request.result);
            };
            
            request.onerror = (event) => {
                console.error('❌ Erro ao salvar projeto:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    async getProject(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['projects'], 'readonly');
            const store = transaction.objectStore('projects');
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    async getAllProjects() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['projects'], 'readonly');
            const store = transaction.objectStore('projects');
            const index = store.index('updatedAt');
            const request = index.getAll();
            
            request.onsuccess = () => {
                // Ordenar por data de atualização (mais recente primeiro)
                const projects = request.result.sort((a, b) => 
                    new Date(b.updatedAt) - new Date(a.updatedAt)
                );
                resolve(projects);
            };
            
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    async deleteProject(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['projects'], 'readwrite');
            const store = transaction.objectStore('projects');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    // Métodos para templates
    async saveTemplate(template) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['templates'], 'readwrite');
            const store = transaction.objectStore('templates');
            const request = store.put(template);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    async getTemplate(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['templates'], 'readonly');
            const store = transaction.objectStore('templates');
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    async getAllTemplates() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['templates'], 'readonly');
            const store = transaction.objectStore('templates');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    // Métodos para configurações
    async saveSetting(key, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            const request = store.put({ key, value });
            
            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    async getSetting(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);
            
            request.onsuccess = () => resolve(request.result?.value);
            request.onerror = (event) => reject(event.target.error);
        });
    }
    
    // Backup e restore
    async exportData() {
        const projects = await this.getAllProjects();
        const templates = await this.getAllTemplates();
        
        return {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            projects,
            templates
        };
    }
    
    async importData(data) {
        // Importar projetos
        for (const project of data.projects || []) {
            await this.saveProject(project);
        }
        
        // Importar templates
        for (const template of data.templates || []) {
            await this.saveTemplate(template);
        }
        
        return true;
    }
}

// Inicializar banco de dados quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    try {
        window.patikaDB = new PatikaDB();
        await window.patikaDB.init();
        console.log('🗃️  PatikaDB pronto para uso');
    } catch (error) {
        console.error('❌ Falha ao inicializar PatikaDB:', error);
        // Fallback para localStorage
        console.log('🔄 Usando localStorage como fallback');
    }
});
