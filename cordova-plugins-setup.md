# 🎥 Configuração de Plugins Cordova para Vídeos do YouTube

## 📱 Plugins Recomendados para Reprodução de Vídeos

### **1. 🔌 InAppBrowser (Recomendado)**
```bash
cordova plugin add cordova-plugin-inappbrowser
```

**Funcionalidade**: Abre vídeos do YouTube dentro do app
**Vantagens**: 
- Não sai do app
- Controle total sobre a interface
- Suporte a autoplay

### **2. 🌐 Safari View Controller (iOS)**
```bash
cordova plugin add cordova-plugin-safariviewcontroller
```

**Funcionalidade**: Abre vídeos no Safari nativo do iOS
**Vantagens**: 
- Interface nativa do iOS
- Histórico compartilhado
- Login automático do YouTube

### **3. 🚀 Chrome Custom Tabs (Android)**
```bash
cordova plugin add cordova-plugin-chrometabs
```

**Funcionalidade**: Abre vídeos no Chrome nativo do Android
**Vantagens**: 
- Interface nativa do Android
- Histórico compartilhado
- Login automático do YouTube

### **4. 🎬 Plugin Nativo do YouTube**
```bash
cordova plugin add cordova-plugin-youtube
```

**Funcionalidade**: Abre vídeos diretamente no app do YouTube
**Vantagens**: 
- Melhor performance
- Interface nativa do YouTube
- Funciona offline

## 🛠️ Instalação Completa

### **Passo 1: Instalar Plugins**
```bash
# Plugin principal para navegação web
cordova plugin add cordova-plugin-inappbrowser

# Plugin para iOS (Safari View Controller)
cordova plugin add cordova-plugin-safariviewcontroller

# Plugin para Android (Chrome Custom Tabs)
cordova plugin add cordova-plugin-chrometabs

# Plugin nativo do YouTube (opcional)
cordova plugin add cordova-plugin-youtube
```

### **Passo 2: Verificar Instalação**
```bash
cordova plugin list
```

### **Passo 3: Recompilar o App**
```bash
# Para Android
cordova build android

# Para iOS
cordova build ios

# Para ambos
cordova build
```

## 🔧 Configurações Adicionais

### **config.xml (Android)**
```xml
<platform name="android">
    <config-file target="AndroidManifest.xml" parent="/manifest/application">
        <activity android:name="com.google.android.youtube.player.YouTubePlayerActivity"
                  android:exported="false"/>
    </config-file>
</platform>
```

### **config.xml (iOS)**
```xml
<platform name="ios">
    <config-file target="Info.plist" parent="LSApplicationQueriesSchemes">
        <array>
            <string>youtube</string>
            <string>youtubemusic</string>
        </array>
    </config-file>
</platform>
```

## 🎯 Como Funciona no App

### **Hierarquia de Métodos:**
1. **Plugin nativo do YouTube** (melhor opção)
2. **InAppBrowser** (dentro do app)
3. **Safari View Controller** (iOS nativo)
4. **Chrome Custom Tabs** (Android nativo)
5. **Navegador externo** (fallback)
6. **Nova aba** (web)

### **Exemplo de Uso:**
```javascript
// No app, quando clicar em um exercício:
openVideoCordova('https://youtu.be/fbupGf-T4KM', 'Supino Reto com Halteres');

// O sistema tentará cada método até um funcionar
```

## 🚨 Solução de Problemas

### **Erro: "Plugin não disponível"**
- Verifique se o plugin foi instalado: `cordova plugin list`
- Recompile o app após instalar plugins
- Verifique se o plugin é compatível com sua versão do Cordova

### **Vídeos não abrem**
- Verifique permissões de internet no app
- Teste com diferentes URLs do YouTube
- Verifique logs do console para erros

### **Performance lenta**
- Use InAppBrowser para vídeos dentro do app
- Configure cache adequado
- Considere usar o plugin nativo do YouTube

## 📱 Teste no Dispositivo

### **Android:**
1. Instale o app no dispositivo
2. Clique em um exercício
3. O vídeo deve abrir no Chrome ou app do YouTube

### **iOS:**
1. Instale o app no dispositivo
2. Clique em um exercício
3. O vídeo deve abrir no Safari ou app do YouTube

## 🎉 Resultado Esperado

Após a configuração, quando você clicar em um exercício:
- ✅ O vídeo abre **dentro do app** (InAppBrowser)
- ✅ Ou abre no **app nativo** do YouTube
- ✅ Ou abre no **navegador nativo** do sistema
- ✅ **Nunca** abre em uma nova aba do navegador

## 🔄 Atualizações

Para manter os plugins atualizados:
```bash
# Verificar atualizações
cordova plugin list

# Atualizar plugins
cordova plugin update

# Recompilar após atualizações
cordova build
```

---

**💡 Dica**: Comece instalando apenas o **InAppBrowser** para testar. É o mais simples e funcional para a maioria dos casos!
