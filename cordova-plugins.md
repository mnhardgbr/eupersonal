## Plugins Cordova para vídeos do YouTube dentro do app

### Objetivo
Abrir vídeos de exercícios do YouTube diretamente no app (nativo) com fallbacks.

### Plugins necessários
- InAppBrowser (fallback webview)
- Safari View Controller (iOS)
- Chrome Custom Tabs (Android)
- YouTube Video Player (abertura nativa do app do YouTube)

### Instalação
```bash
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-safariviewcontroller   # iOS
cordova plugin add cordova-plugin-chrometabs             # Android
cordova plugin add cordova-plugin-youtube-video-player
```

### Plataformas
```bash
cordova platform add android
# cordova platform add ios   # em macOS com Xcode instalado
```

### Build e execução
```bash
cordova build android
cordova run android

# iOS (em macOS)
cordova build ios
cordova run ios
```

### Como funciona no código
- A função `openVideoCordova(url, nome)` tenta, nesta ordem:
  1) Plugin nativo do YouTube (`cordova-plugin-youtube-video-player`)
  2) InAppBrowser
  3) Safari View Controller (iOS)
  4) Chrome Custom Tabs (Android)
  5) Navegador externo do sistema

Se um método falha, o próximo é tentado automaticamente.

### Observações
- Em dispositivos iOS, é necessário provisionamento e permissões corretas no projeto Xcode.
- Em Android, garanta SDKs atualizados no Android SDK Manager.
- Recomenda-se testar em device físico para validar abertura do app nativo do YouTube.


