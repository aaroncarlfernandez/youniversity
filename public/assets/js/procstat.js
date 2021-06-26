function processing(message) {
    document.getElementById("process-status").innerHTML = 
        `
            <div class="flex justify-end fixed inset-0 bg-alphas-black4 bg-contain overflow-x-hidden overflow-y-auto slide-anim-enter-done" id="ModalOverlay" style="z-index: 999;">
                <div class="styles__ProgressModalStyled-sc-14ba9yh-0 eDPnVo">
                    <div class="relative b-status-control styles__StatusControl-sc-14ba9yh-1 fRHuNP">
                        <div class=" flex items-center justify-center text-center  undefined">
                            <div class="ca-anim kynDlI"></div>
                            <span class="pl-1.5 text-utils-loader pt-px"> ${message}...</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    document.documentElement.classList.add("overflow-hidden");
}

function resultNotif(targetPage,message,textStyle) {
    document.getElementById("process-status").style = `transition: opacity 1s`;
    document.getElementById("process-status").innerHTML = 
        `
            <div class="flex justify-end fixed inset-0 bg-alphas-black4 bg-contain overflow-x-hidden overflow-y-auto slide-anim-enter-done" id="ModalOverlay" style="z-index: 999;">
                <div class="styles__ProgressModalStyled-sc-14ba9yh-0 eDPnVo">
                    <div class="relative b-status-control styles__StatusControl-sc-14ba9yh-1 fRHuNP">
                        <div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white ${textStyle}">
                            <span>${message}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    setTimeout(() => {  
        document.documentElement.classList.remove("overflow-hidden");
        window.location.replace(targetPage); }, 1000);
}

function notifNoReplace(message,textStyle) {
    document.getElementById("process-status").style = `transition: opacity 1s`;
    document.getElementById("process-status").innerHTML = 
        `
            <div class="flex justify-end fixed inset-0 bg-alphas-black4 bg-contain overflow-x-hidden overflow-y-auto slide-anim-enter-done" id="ModalOverlay" style="z-index: 999;">
                <div class="styles__ProgressModalStyled-sc-14ba9yh-0 eDPnVo">
                    <div class="relative b-status-control styles__StatusControl-sc-14ba9yh-1 fRHuNP">
                        <div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white ${textStyle}">
                            <span>${message}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    setTimeout(() => {  
        document.documentElement.classList.remove("overflow-hidden"); 
        document.getElementById("process-status").innerHTML = `` }, 1000);
}

function notifReplaceTab(config) {
    for (let i=0; i<2; i++) {
        config.specs.index=i;
        selectTab(config.specs);
    }
    
    setTimeout(() => {  
        document.getElementById("process-status").style = `transition: opacity 1s`;
        document.getElementById("process-status").innerHTML = 
            `
                <div class="flex justify-end fixed inset-0 bg-alphas-black4 bg-contain overflow-x-hidden overflow-y-auto slide-anim-enter-done" id="ModalOverlay" style="z-index: 999;">
                    <div class="styles__ProgressModalStyled-sc-14ba9yh-0 eDPnVo">
                        <div class="relative b-status-control styles__StatusControl-sc-14ba9yh-1 fRHuNP">
                            <div class="py-0 px-4 h-full flex items-center justify-center text-center bg-white ${config.textStyle}">
                                <span>${config.message}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
    }, 1000);

    setTimeout(() => {  
        document.documentElement.classList.remove("overflow-hidden"); 
        document.getElementById("process-status").innerHTML = `` }, 1000);
}
