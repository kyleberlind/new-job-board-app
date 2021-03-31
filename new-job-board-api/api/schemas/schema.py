"""03/04/2021"""
# pylint: disable=no-member
from datetime import datetime
from flask import session
import graphene
from sqlalchemy.orm.session import close_all_sessions
from graphene_sqlalchemy import SQLAlchemyObjectType
from ..models.job_posting.job_posting_application_model import JobPostingApplicationModelSQLAlchemy
from ..models.job_posting.job_posting_model import JobPostingModelSQLAlchemy
from ..models.job_posting.job_posting_location_model import JobPostingLocationModelSQLAlchemy
from ..models.job_posting.job_posting_field_mapping_model import JobPostingFieldMappingModel
from ..models.job_posting.job_posting_field_model import JobPostingFieldModelSQLAlchemy
from ..models.employer_model import EmployerModelSQLAlchemy
from ..models.user_model import UserModelSQLAlchemy
from ..utilities.hash_engine import generate_hashed_password, generate_salt
from .job_posting.job_posting_input import JobPostingInput
from ..__init__ import db


class UserObject(SQLAlchemyObjectType):
    """GQL Object to represent the User"""
    class Meta:
        """UserObject meta object"""
        model = UserModelSQLAlchemy
        interfaces = (graphene.relay.Node, )


class EmployerObject(SQLAlchemyObjectType):
    """GQL Object to represent the Employer"""
    class Meta:
        """EmployerObject meta object"""
        model = EmployerModelSQLAlchemy
        interfaces = (graphene.relay.Node, )


class JobPostingApplicationObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting application"""
    class Meta:
        """JobPostingApplicationObject meta object"""
        model = JobPostingApplicationModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class JobPostingModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting"""
    class Meta:
        """JobPostingModelObject meta object"""
        model = JobPostingModelSQLAlchemy


class JobPostingLocationModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting location info"""
    class Meta:
        """JobPostingLocationModelObject meta object"""
        model = JobPostingLocationModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class JobPostingFieldMappingObject(SQLAlchemyObjectType):
    """GQL Object to represent the mapping between job postings and fields"""

    class Meta:
        """JobPostingFieldMappingObject meta object"""
        model = JobPostingFieldMappingModel


class JobPostingFieldModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting fields"""
    class Meta:
        """JobPostingFieldModelObject meta object"""
        model = JobPostingFieldModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    """Query object"""
    node = graphene.relay.Node.Field()
    applications_by_employer_id = graphene.List(
        JobPostingApplicationObject, employer_id=graphene.Int())
    applications_by_employer_reference_id = graphene.List(
        JobPostingApplicationObject, employer_reference_id=graphene.String())
    applications_by_employer_applicant_id = graphene.List(
        JobPostingApplicationObject, applicant_id=graphene.Int())
    employer = graphene.Field(
        EmployerObject)

    @staticmethod
    def resolve_applications_by_employer_id(parent, info, **args):
        """Resolves the job posting applications by the employer ID"""
        employer_id = args.get('employer_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        # close the connection to prevent QueryPool Overflow, TODO revisit to see if this is correct
        close_all_sessions()
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.employer_id.contains(employer_id)).all()

    @staticmethod
    def resolve_applications_by_employer_reference_id(parent, info, **args):
        """Resolves the job posting applications by the employer reference ID"""
        employer_reference_id = args.get('employer_reference_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        close_all_sessions()
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.employer_reference_id.contains(
                employer_reference_id
            )
        ).all()

    @staticmethod
    def resolve_applications_by_employer_applicant_id(parent, info, **args):
        """Resolves the job posting applications by the applicant ID"""
        applicant_id = args.get('applicant_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        close_all_sessions()
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.applicant_id.contains(
                applicant_id
            )
        ).all()

    @staticmethod
    def resolve_employer(parent, info, **args):
        """Resolves the employer info"""
        if "token" in session:
            employer_query = EmployerObject.get_query(info)
            close_all_sessions()
            return employer_query.filter(
                EmployerModelSQLAlchemy.user_id.contains(
                    session["token"]
                )
            ).first()
        else:
            raise Exception("No User Logged in")


class UpdateApplicationStatus(graphene.Mutation):
    """Mutation to update the application status"""
    class Arguments:
        """Arguments for UpdateApplicationStatus"""
        employer_reference_id = graphene.String(required=True)
        new_status = graphene.String(required=True)

    job_posting_application = graphene.Field(
        lambda: JobPostingApplicationObject)

    def mutate(self, info, employer_reference_id, new_status):
        """Mutation for updating the application status"""
        applications_query = JobPostingApplicationObject.get_query(info)
        applications_query\
            .filter(
                JobPostingApplicationModelSQLAlchemy.employer_reference_id == employer_reference_id
            ).update({"status": new_status})
        db.session.commit()
        db.session.close()


class UpdateEmployerSize(graphene.Mutation):
    """Mutation to update the employer size"""
    class Arguments:
        """Arguments for UpdateEmployerSize"""
        employer_id = graphene.Int(required=True)
        new_size = graphene.String(required=True)

    employer = graphene.Field(
        lambda: EmployerObject)

    def mutate(self, info, employer_id, new_size):
        """Mutation for updating the employer size"""
        employer_query = EmployerObject.get_query(info)
        employer_query.filter(
            EmployerModelSQLAlchemy.employer_id == employer_id).update({"employer_size": new_size})
        db.session.commit()
        db.session.close()


class AddJobPosting(graphene.Mutation):
    """Mutation to update the employer size"""
    class Arguments:
        """Arguments for UpdateEmployerSize"""
        job_posting_input = JobPostingInput(required=True)

    job_posting = graphene.Field(
        lambda: JobPostingModelObject)

    def mutate(self, info, job_posting_input):
        """Mutation for updating the employer size"""
        job_posting = JobPostingModelSQLAlchemy(
            employer_id=job_posting_input["employer_id"],
            role=job_posting_input["role"],
            team=job_posting_input["team"],
            description=job_posting_input["description"],
            date_created=datetime.now()
        )
        db.session.add(job_posting)

        db.session.flush()

        job_posting_location = JobPostingLocationModelSQLAlchemy(
            job_id=job_posting.id,
            **job_posting_input["location"]
        )
        db.session.add(job_posting_location)

        job_posting_fields = map(lambda job_posting_field: JobPostingFieldMappingModel(
            job_id=job_posting.id,
            required=job_posting_field["required"],
            field_id=job_posting_field["id"]
        ), job_posting_input["fields"])
        db.session.bulk_save_objects(job_posting_fields)
        
        db.session.commit()
        return AddJobPosting(job_posting=job_posting)




class UpdatePassword(graphene.Mutation):
    """Mutation to update the users password"""
    class Arguments:
        """Arguments for UpdatePassword"""
        user_id = graphene.Int(required=True)
        current_password = graphene.String(required=True)
        new_password = graphene.String(required=True)

    user = graphene.Field(
        lambda: UserObject)

    def mutate(self, info, user_id, current_password, new_password):
        """Mutation for updating the users password"""
        user_query = UserObject.get_query(info)
        user = user_query.filter(
            UserModelSQLAlchemy.id == user_id).first()

        hashed_current_password = generate_hashed_password(
            current_password.encode('utf-8'), user.salt.encode('utf-8'))

        hashed_new_password = generate_hashed_password(
            new_password.encode('utf-8'), user.salt.encode('utf-8'))

        if hashed_current_password != user.password.encode('utf-8'):
            raise Exception("Incorrect current password")

        if hashed_new_password == user.password.encode('utf-8'):
            raise Exception("New password cannot be the same as old password")

        new_salt = generate_salt()
        user_query.update(
            {
                "password": generate_hashed_password(new_password.encode('utf-8'), new_salt),
                "salt": new_salt
            }
        )
        db.session.commit()
        db.session.close()


class Mutation(graphene.ObjectType):
    """Mutation Object"""
    update_application_status = UpdateApplicationStatus.Field()
    update_employer_size = UpdateEmployerSize.Field()
    update_password = UpdatePassword.Field()
    add_job_posting = AddJobPosting.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
