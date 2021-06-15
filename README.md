# Beispiel: Kompilierung *.ts -> *.wasm

Die Kompilierung von TypeScript zu WebAssembly wird durch den AssemblyScript-Compiler ausgeführt. (Es wird dafür WASI genutzt)

Um den WebAssembly-Code auszuführen wird wasmtime genutzt. 

# npm run build 
"asc assembly/index.ts -b build/index.wasm -t build/index.wat --exportRuntime",

# npm run start
"wasmtime --dir . build/index.wasm"

Die --dir Flag bewirkt, dass auf das Dateisystem des Hosts zugegriffen werden kann. (capability-based security)
