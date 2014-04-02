describe('select Multiple Appointment Types controller', function() {
    var scope,
        deferred,
        promise,
        mockAppointmentService,
        mockFilterFilter;

    beforeEach(module('selectMultipleAppointmentTypesApp'));

    beforeEach(inject(function ($rootScope, $controller, $q) {
        deferred = $q.defer();
        promise = deferred.promise;
        mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['getAppointmentTypes']);
        mockAppointmentService.getAppointmentTypes.andCallFake(function () { return promise; });

        mockFilterFilter = jasmine.createSpy('filterFilter');

        scope = $rootScope.$new();
        $controller('selectMultipleAppointmentTypesController', {$scope: scope, AppointmentService: mockAppointmentService, filterFilter:mockFilterFilter});
    }));

    describe('the view all types list must be populated with the appointment types from service', function () {
      it('should populate the allAppointmentTypes list when the controller is created', function() {
          var appointmentType1 = {
              appointmenttype: {
                  uuid: '0c186cdd-44c4-49d7-8694-1880d955101c',
                  display: 'type 1'
              }
          };

          var appointmentType2 = {
              appointmenttype: {
                  uuid: '0c186cdd-44c4-49d7-8694-1880d955101b',
                  display: 'type 2'
              }
          };

          var appointmentTypes = [appointmentType1, appointmentType2];
          scope.allAppointmentTypes = [];

          deferred.resolve(appointmentTypes);
          scope.$apply();

          expect(scope.allAppointmentTypes).toBe(appointmentTypes);
      });
    });

    describe('an event should be sent informing that the selected appointment types changed', function () {
        var listener = jasmine.createSpy('listener');

        it('must emit an event when an appointment type is added to the selectedAppointmentTypes list', function () {
            scope.selectedAppointmentTypes = [];
            scope.$on('selectMultipleAppointmentTypesApp.selectionChanged', listener);

            scope.addAppointmentType(scope.selectedAppointmentTypes);
            scope.$apply();

            expect(listener).toHaveBeenCalled();
        });

        it('must emit an event when an appointment type is removed to the selectedAppointmentTypes list', function () {
            var appointmentType = {
                appointmenttype: {
                    uuid: '0c186cdd-44c4-49d7-8694-1880d955101c',
                    display: 'type 1'
                }
            };
            scope.selectedAppointmentTypes = [];
            scope.selectedAppointmentTypes.push(appointmentType);

            scope.removeAppointmentType(appointmentType);
            scope.$apply();

            expect(listener).toHaveBeenCalled();
        });
    });
})