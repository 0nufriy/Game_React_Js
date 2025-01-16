import constant from "../../constant"

const CountBase = (setBase) => {
   
    setBase((prevBase) => {
        const oldDate = new Date(prevBase.lastResourceUpgrade)
        const newDate = new Date()
        let second = Math.abs((oldDate - newDate) / 1000)
        const genCanDo = prevBase.generatorResources.used / (prevBase.drills * constant.drilResourceEat)
        const baseCanStorage = (prevBase.storage.capacity - prevBase.storage.used) / (prevBase.drills * constant.resaourcePerDril)
    
        if(genCanDo <= second && genCanDo <= baseCanStorage) second = genCanDo
        if(baseCanStorage <= second && baseCanStorage <= genCanDo) second = baseCanStorage
    
        const genEat = second * prevBase.drills * constant.drilResourceEat
        const updatedGeneratorResourcesUsed = prevBase.generatorResources.used - genEat;
        let updatedStorageUsed = prevBase.storage.used + second * prevBase.drills * constant.resaourcePerDril
        if (updatedStorageUsed > prevBase.storage.capacity) {
            updatedStorageUsed = prevBase.storage.capacity;
        }
        return {
            ...prevBase,
            lastResourceUpgrade: newDate.toISOString(),
            generatorResources: {
                ...prevBase.generatorResources,
                used: updatedGeneratorResourcesUsed,
            },
            storage: {
                ...prevBase.storage,
                used: updatedStorageUsed,
            },
        };
    });
}


export default CountBase