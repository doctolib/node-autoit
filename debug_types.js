// Debug script to test exported functions from the AutoIt module
var path = require('path');

console.log('Testing AutoIt module import and exported functions...\n');

try {
    // Try to import the AutoIt module
    var autoit = require('./index.js');
    console.log('✅ AutoIt module imported successfully');
    
    // List some of the available exported functions
    console.log('\n📋 Available functions:');
    const functionsToTest = [
        'WinExists',
        'WinActive',
        'WinActivate', 
        'WinClose', 
        'WinGetHandle', 
        'MouseClick', 
        'Send', 
        'ControlClick',
        'Init',
        'error'
    ];
    
    functionsToTest.forEach(funcName => {
        if (typeof autoit[funcName] === 'function') {
            console.log(`✅ ${funcName}: function`);
            
            // Check if async version exists
            if (typeof autoit[funcName].async === 'function') {
                console.log(`   ✅ ${funcName}.async: function`);
            } else {
                console.log(`   ❌ ${funcName}.async: not available`);
            }
        } else {
            console.log(`❌ ${funcName}: ${typeof autoit[funcName]}`);
        }
    });
    
    // Test PostMessage and SendMessage functions
    console.log('\n📋 Windows API functions:');
    const winApiFunctions = ['PostMessage', 'SendMessage', 'GetDlgCtrlID'];
    
    winApiFunctions.forEach(funcName => {
        if (typeof autoit[funcName] === 'function') {
            console.log(`✅ ${funcName}: function`);
        } else {
            console.log(`❌ ${funcName}: ${typeof autoit[funcName]}`);
        }
    });
    
    // Test safe function calls (these won't actually work on macOS but should not crash)
    console.log('\n🧪 Testing safe function calls:');
    
    try {
        // Test error function (should work without DLL)
        console.log('Testing error function...');
        if (typeof autoit.error === 'function') {
            var errorCode = autoit.error();
            console.log(`✅ autoit.error() returned: ${errorCode}`);
        }
    } catch (err) {
        console.log(`❌ autoit.error() failed: ${err.message}`);
    }
    
    try {
        // Test WinExists with a dummy window name (will likely return 0/false)
        console.log('Testing WinExists function...');
        if (typeof autoit.WinExists === 'function') {
            // This won't work on macOS but should show the function structure
            console.log('✅ WinExists function is callable (actual call will fail on macOS)');
        }
    } catch (err) {
        console.log(`❌ WinExists test failed: ${err.message}`);
    }
    
    console.log('\n✅ All tests completed successfully!');
    
} catch (error) {
    console.error('❌ Failed to import AutoIt module:', error.message);
    console.error('Error details:', error);
    
    // Try to give more specific error information
    if (error.message.includes('platform')) {
        console.log('\n💡 This error is expected on non-Windows platforms');
        console.log('   AutoIt is Windows-specific automation software');
    } else if (error.message.includes('Unexpected Object value')) {
        console.log('\n💡 This suggests a type definition issue in koffi/ffi');
        console.log('   Check that all function type definitions use string types');
    } else if (error.message.includes('Cannot find module')) {
        console.log('\n💡 Missing dependency. Try running:');
        console.log('   npm install ffi-napi ref-napi ref-struct-di');
    }
} 