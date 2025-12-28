let activeSession: any = null;
export const getActiveSession = () => activeSession;

export const startSession = (classId: string, teacherId: string) => {
    activeSession = {
        classId,
        teacherId,
        startedAt: new Date().toISOString(),
        attendance: {}
    }
    return activeSession;
}

export const markAttendance = (studentId: string, status: string) => {
    
    if (!activeSession) return;
    getActiveSession().attendance[studentId] = { status };
};

export const endSession = () => {
    activeSession = null;
}