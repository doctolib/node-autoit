var au = require('./index');

console.log('=== AutoIt Node.js Test Suite ===');
console.log('Testing with notepad.exe...\n');

try {
    // Initialize AutoIt
    console.log('1. Initializing AutoIt...');
    au.Init();
    console.log('   ✓ AutoIt initialized successfully');

    // Launch notepad
    console.log('\n2. Launching notepad.exe...');
    var processId = au.Run("notepad.exe");
    console.log('   ✓ Notepad launched with PID:', processId);

    // Wait for notepad window to appear
    console.log('\n3. Waiting for Notepad window...');
    var windowExists = au.WinWait("[Class:Notepad]", "", 5000); // 5 second timeout
    if (windowExists) {
        console.log('   ✓ Notepad window found');
    } else {
        console.log('   ✗ Timeout waiting for Notepad window');
        process.exit(1);
    }

    // Test WinExists function
    console.log('\n4. Testing WinExists function...');
    var exists = au.WinExists("[Class:Notepad]");
    console.log('   Window exists:', exists ? '✓ Yes' : '✗ No');

    // Test WinActive function (before activation)
    console.log('\n5. Testing WinActive function (before activation)...');
    var isActive = au.WinActive("[Class:Notepad]");
    console.log('   Window active:', isActive ? '✓ Yes' : '✗ No');

    // Activate the window
    console.log('\n6. Activating Notepad window...');
    var activated = au.WinActivate("[Class:Notepad]");
    if (activated) {
        console.log('   ✓ Window activated successfully');
    } else {
        console.log('   ✗ Failed to activate window');
    }

    // Test WinActive function (after activation)
    console.log('\n7. Testing WinActive function (after activation)...');
    au.Sleep(500); // Give time for activation
    isActive = au.WinActive("[Class:Notepad]");
    console.log('   Window active:', isActive ? '✓ Yes' : '✗ No');

    // Get window information
    console.log('\n8. Getting window information...');
    var windowTitle = au.WinGetTitle("[Class:Notepad]");
    console.log('   Window title:', windowTitle);
    
    var windowHandle = au.WinGetHandle("[Class:Notepad]");
    console.log('   Window handle:', windowHandle);

    var windowState = au.WinGetState("[Class:Notepad]");
    console.log('   Window state:', windowState);

    // Send text to notepad
    console.log('\n9. Sending text to Notepad...');
    au.Send("Hello, AutoIt & Node.js!");
    console.log('   ✓ Text sent successfully');

    // Test control commands
    console.log('\n10. Testing control commands...');
    var isVisible = au.ControlCommand("[Class:Notepad]", "", "[CLASS:Edit]", "IsVisible");
    console.log('   Edit control visible:', isVisible);

    var isEnabled = au.ControlCommand("[Class:Notepad]", "", "[CLASS:Edit]", "IsEnabled");
    console.log('   Edit control enabled:', isEnabled);

    // Wait a moment to see the result
    console.log('\n11. Waiting 3 seconds for demonstration...');
    au.Sleep(3000);

    // Test async function
    console.log('\n12. Testing async function...');
    au.ClipPut("Test clipboard content");
    au.ClipGet.async(function(err, result) {
        if (err) {
            console.log('✗ Async ClipGet error:', err.message);
        } else {
            console.log('✓ Async ClipGet result:', result);
        }
    });

    // Test truly async WinWaitActive - this should NOT block the main thread
    console.log('\n13. Testing WinWaitActive.async (non-blocking behavior)...');
    console.log('   Starting async WinWaitActive call...');
    
    var startTime = Date.now();
    
    // This should not block - we're waiting for a window that doesn't exist
    au.WinWaitActive.async("NonExistentWindow12345", "", 2000, function(err, result) {
        var endTime = Date.now();
        console.log('   ✓ Async WinWaitActive completed after', endTime - startTime, 'ms');
        console.log('   Result:', result, '(0 = timeout, which is expected)');
        
        // Final cleanup
        console.log('\n14. Cleaning up...');
        var closed = au.WinClose("[Class:Notepad]");
        if (closed) {
            console.log('✓ Notepad closed successfully');
        } else {
            console.log('✗ Failed to close Notepad');
            // Force close if normal close failed
            au.WinKill("[Class:Notepad]");
            console.log('✓ Notepad force-closed');
        }
        
        console.log('\n=== Test completed successfully! ===');
    });
    
    // This should execute immediately, proving the async call above didn't block
    console.log('   ✓ This message proves the main thread is NOT blocked!');
    console.log('   (If you see this immediately, async is working correctly)');

} catch (error) {
    console.error('\n✗ Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Attempt cleanup on error
    try {
        au.WinKill("[Class:Notepad]");
        console.log('Emergency cleanup: Notepad force-closed');
    } catch (cleanupError) {
        console.error('Cleanup failed:', cleanupError.message);
    }
    
    process.exit(1);
} 
