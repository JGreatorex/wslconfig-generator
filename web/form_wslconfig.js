"use strict";

const wslconfigform = document.forms.wslconfig;
const modal = document.getElementById("modal");
const modalClose = document.getElementById("closeModal");
const configDisplay = document.getElementById("generatedConfig");

wslconfigform.addEventListener('submit', function(event) {
    event.preventDefault();
    let wslconfigtext = ["# Settings apply across all Linux distros running on WSL 2", "[wsl2]"];

    let elements = wslconfigform.elements;

    if ((elements.guiApplications.checked || elements.debugConsole.checked || elements.nestedVirtualisation.checked || elements.vmIdleTimeout.value) && elements.w11.checked) {
        alert("You have values set which are for Windows 11 only.")
    }

    if (elements.kernel.value) {
        let kernelPath = elements.kernel.value.replace(/\\/g,"\\\\");
        wslconfigtext.push(
            "",
            "# Specify a custom Linux kernel to use with your installed distros. The default kernel used can be found at https://github.com/microsoft/WSL2-Linux-Kernel",
            `kernel=${kernelPath}`
        );
    }

    if (elements.kernelCommandLine.value) {
        wslconfigtext.push(
            "",
            "# Sets additional kernel parameters, in this case enabling older Linux base images such as Centos 6",
            `kernel=${elements.kernelCommandLine.value}`
        );
    }

    if (elements.memory.value) {
        let memoryUnit = wslconfigform.elements.memoryUnit;
        wslconfigtext.push(
            "",
            `# Limits VM memory to use no more than ${elements.memory.value}${memoryUnit.value}, this can be set as whole numbers using GB or MB`,
            `memory=${elements.memory.value}${memoryUnit.value}`,
        );
    }

    if (elements.processors.value) {
        wslconfigtext.push(
            "",
            `# Sets the VM to use ${elements.processors.value} virtual processors`,
            `processors=${elements.processors.value}`,
        );
    }

    if (elements.safeMode.checked) {
        wslconfigtext.push(
            "",
            "# Run WSL in \"Safe Mode\" which disables many features and is intended to be used to recover distributions",
            `safeMode=true`,
        );
    }

    if (elements.swapSize.value) {
        wslconfigtext.push(
            "",
            `# Sets amount of swap storage space to ${elements.swapSize.value}GB, default is 25% of available RAM`,
            `swap=${elements.swapSize.value}GB`,
        );
    }

    if (elements.swapFile.value) {
        wslconfigtext.push(
            "",
            "# Sets swapfile path location, default is %USERPROFILE%\\AppData\\Local\\Temp\\swap.vhdx",
            `swapfile=${elements.swapFile.value}`,
        );
    }

    if (elements.pageReporting.checked) {
        wslconfigtext.push(
            "",
            "# Enable page reporting so WSL releases memory back when free",
            `pageReporting=true`,
        );
    } else {
        wslconfigtext.push(
            "",
            "# Disable page reporting so WSL retains all allocated memory claimed from Windows and releases none back when free",
            `pageReporting=false`,
        );
    }

    if (elements.w11.checked) {
        if (elements.guiApplications.checked) {
            wslconfigtext.push(
                "",
                "# Turns on support for GUI applications (WSLg)",
                `guiApplications=true`,
            );
        } else {
            wslconfigtext.push(
                "",
                "# Turns off support for GUI applications (WSLg)",
                `guiApplications=false`,
            );
        }
    
        if (elements.debugConsole.checked) {
            wslconfigtext.push(
                "",
                "# Turns on an output console Window that shows the contents of dmesg upon start of a WSL 2 distro instance.",
                `guiApplications=true`,
            );
        }
    
        if (elements.nestedVirtualisation.checked) {
            wslconfigtext.push(
                "",
                "# Turns on nested virtualization, enabling other nested VMs to run inside WSL 2.",
                `nestedVirtualization=true`,
            );
        } else {
            wslconfigtext.push(
                "",
                "# Turns off nested virtualization, disabling other nested VMs to run inside WSL 2.",
                `nestedVirtualization=false`,
            );
        }
        
        if (elements.vmIdleTimeout.value) {
            wslconfigtext.push(
                "",
                "# The number of milliseconds that a VM is idle, before it is shut down.",
                `vmIdleTimeout=${vmIdleTimeout.value}`,
            );
        }
    }

    configDisplay.innerText = wslconfigtext.join("\r\n");
    modal.style.display = "block";
    window.scrollTo(0,0);
});

modalClose.addEventListener("click", function(event) {
    modal.style.display = "none";
});