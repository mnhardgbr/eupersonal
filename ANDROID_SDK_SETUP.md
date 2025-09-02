## Guia rápido: Configurar Android SDK no Windows (para Cordova)

### 1) Instalar Android Studio
- Baixe e instale o Android Studio (inclui Android SDK):
  - https://developer.android.com/studio

### 2) Instalar SDKs e ferramentas
Abra o Android Studio > SDK Manager e instale:
- Android SDK Platform 34 (Android 14)
- Android SDK Platform-Tools
- Android SDK Build-Tools (última versão disponível)
- Android Emulator (opcional, se for usar emulador)

### 3) Java (JDK)
- Cordova Android 13 funciona com JDK 17. Instale o Temurin/OpenJDK 17:
  - https://adoptium.net/temurin/releases/

### 4) Variáveis de Ambiente (Sistema)
Painel de Controle > Sistema > Configurações avançadas > Variáveis de Ambiente:

- Nova variável de usuário:
  - Nome: `ANDROID_HOME`
  - Valor: `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk` (ajuste conforme seu diretório)

- Edite `Path` (do usuário) e adicione:
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\tools\bin` (opcional, para SDK Manager antigo)
  - `%ANDROID_HOME%\cmdline-tools\latest\bin` (se usar cmdline-tools mais recentes)

- Java (se necessário):
  - Crie `JAVA_HOME` apontando para a pasta do JDK 17 (ex.: `C:\Program Files\Eclipse Adoptium\jdk-17\`)
  - Em `Path`, adicione `%JAVA_HOME%\bin`

Feche e reabra o PowerShell/Terminal após salvar as variáveis.

### 5) Validar no Terminal
```powershell
adb version
java -version
```
Ambos devem responder com versões válidas.

### 6) Build e Run do App
No diretório do projeto:
```powershell
cordova build android
cordova run android
```

Se o build pedir licença do SDK (avdmanager/sdkmanager), aceite via SDK Manager ou cmdline-tools.


