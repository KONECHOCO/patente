# Adds localized InfoPlist.strings (home-screen name + system permission texts) to the iOS project.
# Run once after `cap add ios`; idempotent.
import io, os

ROOT = os.path.join(os.path.dirname(__file__), '..', 'ios', 'App')
PBX = os.path.join(ROOT, 'App.xcodeproj', 'project.pbxproj')

STRINGS = {
    'it': ('Patente', 'I tuoi dati servono a mostrarti annunci più pertinenti e a mantenere gratuita l\'app.'),
    'en': ('Licence', 'Your data will be used to show you more relevant ads and keep the app free.'),
    'fr': ('Permis', 'Tes données servent à afficher des publicités plus pertinentes et à garder l\'app gratuite.'),
    'es': ('Carné', 'Tus datos se usan para mostrarte anuncios más relevantes y mantener la app gratis.'),
    'de': ('Führerschein', 'Deine Daten werden genutzt, um passendere Werbung zu zeigen und die App kostenlos zu halten.'),
}

for lang, (name, att) in STRINGS.items():
    d = os.path.join(ROOT, 'App', f'{lang}.lproj')
    os.makedirs(d, exist_ok=True)
    with io.open(os.path.join(d, 'InfoPlist.strings'), 'w', encoding='utf-8') as f:
        f.write(f'"CFBundleDisplayName" = "{name}";\n"CFBundleName" = "{name}";\n"NSUserTrackingUsageDescription" = "{att}";\n')

s = io.open(PBX, encoding='utf-8').read()
if 'InfoPlist.strings' not in s:
    vg, bf = 'A1B2C3D4E5F6000000000001', 'A1B2C3D4E5F6000000000002'
    refs = {lang: f'A1B2C3D4E5F60000000001{i:02d}' for i, lang in enumerate(STRINGS)}
    s = s.replace('/* End PBXBuildFile section */',
                  f'\t\t{bf} /* InfoPlist.strings in Resources */ = {{isa = PBXBuildFile; fileRef = {vg} /* InfoPlist.strings */; }};\n/* End PBXBuildFile section */')
    s = s.replace('/* End PBXFileReference section */',
                  ''.join(f'\t\t{rid} /* {lang} */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.strings; name = {lang}; path = {lang}.lproj/InfoPlist.strings; sourceTree = "<group>"; }};\n' for lang, rid in refs.items())
                  + '/* End PBXFileReference section */')
    s = s.replace('/* Begin PBXVariantGroup section */',
                  '/* Begin PBXVariantGroup section */\n'
                  f'\t\t{vg} /* InfoPlist.strings */ = {{\n\t\t\tisa = PBXVariantGroup;\n\t\t\tchildren = (\n'
                  + ''.join(f'\t\t\t\t{rid} /* {lang} */,\n' for lang, rid in refs.items())
                  + '\t\t\t);\n\t\t\tname = InfoPlist.strings;\n\t\t\tsourceTree = "<group>";\n\t\t};')
    s = s.replace('\t\t\t\t504EC3131FED79650016851F /* Info.plist */,',
                  f'\t\t\t\t504EC3131FED79650016851F /* Info.plist */,\n\t\t\t\t{vg} /* InfoPlist.strings */,')
    s = s.replace('\t\t\t\t2FAD9763203C412B000D30F8 /* config.xml in Resources */,\n\t\t\t);',
                  f'\t\t\t\t2FAD9763203C412B000D30F8 /* config.xml in Resources */,\n\t\t\t\t{bf} /* InfoPlist.strings in Resources */,\n\t\t\t);')
    s = s.replace('\t\t\tknownRegions = (\n\t\t\t\ten,\n\t\t\t\tBase,\n\t\t\t);',
                  '\t\t\tknownRegions = (\n\t\t\t\ten,\n\t\t\t\tBase,\n\t\t\t\tit,\n\t\t\t\tfr,\n\t\t\t\tes,\n\t\t\t\tde,\n\t\t\t);')
    s = s.replace('MARKETING_VERSION = 1.0;', 'MARKETING_VERSION = 1.0.0;')
    io.open(PBX, 'w', encoding='utf-8', newline='').write(s)
print('ok', s.count('InfoPlist.strings'))
