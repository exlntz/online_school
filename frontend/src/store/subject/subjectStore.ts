import { create } from 'zustand'
import { devtools, persist, type DevtoolsOptions, type PersistOptions } from 'zustand/middleware'
import type { SubjectState, SubjectStore } from './types'

const defaultSubject: SubjectState = {
    subject: 'math'
}

const devToolsOptions: DevtoolsOptions = {
    store: 'subject-storage',
    enabled: import.meta.env.DEV
}

const persistOptions: PersistOptions<SubjectStore, Omit<SubjectStore, 'actions'>> = {
    name: 'subject-storage',
    partialize: (state) => {
        const { actions: _, ...rest } = state
        return rest
    }
}

export const useSubjectStore = create<SubjectStore>()(
    devtools(
        persist(
            (set) => ({
                ...defaultSubject,

                actions: {
                    setSubject: (id) => set(
                        {subject: id},
                        false,
                        { 
                            type: 'setSubject',
                            payload: id
                        }
                    )
                }
            }),
            persistOptions
        ),
        devToolsOptions
    )
)